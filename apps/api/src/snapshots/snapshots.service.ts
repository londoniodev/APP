import {
    Injectable,
    Logger,
    NotFoundException,
    Inject,
    ServiceUnavailableException
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Snapshot } from './entities/snapshot.entity';
import type { IStorageService } from '../common/storage/storage.interface';
import { CamerasService } from '../cameras/cameras.service';
import { exec } from 'child_process';
import { promisify } from 'util';
import * as fs from 'fs/promises';
import * as path from 'path';
import * as os from 'os';

const execAsync = promisify(exec);

/** Cache duration in milliseconds (5 minutes) */
const CACHE_DURATION_MS = 5 * 60 * 1000;

/**
 * Service for capturing and managing camera snapshots.
 * 
 * @remarks
 * Uses FFmpeg to capture frames from RTSP streams.
 * Snapshots are cached for 5 minutes to avoid excessive captures.
 * 
 * @example
 * ```typescript
 * const snapshot = await snapshotsService.getOrCapture(cameraId, userId);
 * console.log(snapshot.url); // Public URL to the image
 * ```
 */
@Injectable()
export class SnapshotsService {
    private readonly logger = new Logger(SnapshotsService.name);

    constructor(
        @InjectRepository(Snapshot)
        private snapshotRepository: Repository<Snapshot>,
        @Inject('IStorageService')
        private storageService: IStorageService,
        private camerasService: CamerasService,
    ) { }

    /**
     * Gets the latest snapshot or captures a new one if cache expired.
     * 
     * @param cameraId - UUID of the camera
     * @param userId - UUID of the requesting user (for ownership validation)
     * @returns Snapshot with URL and metadata
     * @throws NotFoundException if camera doesn't exist
     * @throws ForbiddenException if user doesn't own the camera
     */
    async getOrCapture(cameraId: string, userId: string): Promise<Snapshot> {
        // Validate camera ownership
        const camera = await this.camerasService.findOne(cameraId);
        if (!camera) {
            throw new NotFoundException(`Camera ${cameraId} not found`);
        }

        // Check for cached snapshot
        const existing = await this.snapshotRepository.findOne({
            where: { cameraId }
        });

        if (existing) {
            const age = Date.now() - existing.capturedAt.getTime();
            if (age < CACHE_DURATION_MS) {
                this.logger.log(`Using cached snapshot for camera ${cameraId}`);
                return existing;
            }
        }

        // Capture new snapshot
        return this.captureSnapshot(cameraId, camera.rtspUrl);
    }

    /**
     * Forces capture of a new snapshot, bypassing cache.
     * 
     * @param cameraId - UUID of the camera
     * @param userId - UUID of the requesting user
     * @returns Newly captured snapshot
     */
    async forceCapture(cameraId: string, userId: string): Promise<Snapshot> {
        const camera = await this.camerasService.findOne(cameraId);
        if (!camera) {
            throw new NotFoundException(`Camera ${cameraId} not found`);
        }

        return this.captureSnapshot(cameraId, camera.rtspUrl);
    }

    /**
     * Captures a snapshot from an RTSP stream using FFmpeg.
     * 
     * @param cameraId - UUID of the camera
     * @param rtspUrl - RTSP stream URL
     * @returns Captured snapshot entity
     * @throws ServiceUnavailableException if FFmpeg fails
     */
    private async captureSnapshot(cameraId: string, rtspUrl: string): Promise<Snapshot> {
        const tempFile = path.join(os.tmpdir(), `snapshot_${cameraId}_${Date.now()}.jpg`);
        const storageKey = `snapshots/${cameraId}.jpg`;

        try {
            // Capture frame using FFmpeg
            // -y: overwrite output
            // -rtsp_transport tcp: use TCP for more reliable streaming
            // -i: input URL
            // -frames:v 1: capture only 1 frame
            // -q:v 2: high quality JPEG (2 is near-lossless)
            const ffmpegCmd = `ffmpeg -y -rtsp_transport tcp -i "${rtspUrl}" -frames:v 1 -q:v 2 "${tempFile}"`;

            this.logger.log(`Capturing snapshot for camera ${cameraId}`);
            await execAsync(ffmpegCmd, { timeout: 15000 }); // 15 second timeout

            // Read captured file
            const imageBuffer = await fs.readFile(tempFile);

            // Save to storage
            await this.storageService.save(storageKey, imageBuffer);

            // Cleanup temp file
            await fs.unlink(tempFile).catch(() => { });

            // Update or create snapshot record
            let snapshot = await this.snapshotRepository.findOne({
                where: { cameraId }
            });

            if (snapshot) {
                snapshot.filePath = storageKey;
                snapshot.capturedAt = new Date();
            } else {
                snapshot = this.snapshotRepository.create({
                    cameraId,
                    filePath: storageKey,
                    capturedAt: new Date()
                });
            }

            await this.snapshotRepository.save(snapshot);
            this.logger.log(`Snapshot captured for camera ${cameraId}`);

            return snapshot;

        } catch (error) {
            this.logger.error(`Failed to capture snapshot for camera ${cameraId}`, error);

            // Cleanup temp file on error
            await fs.unlink(tempFile).catch(() => { });

            throw new ServiceUnavailableException(
                `Failed to capture snapshot. Camera may be offline or RTSP URL invalid.`
            );
        }
    }

    /**
     * Gets the public URL for a snapshot.
     * 
     * @param snapshot - Snapshot entity
     * @returns Public URL to the image
     */
    getSnapshotUrl(snapshot: Snapshot): string {
        return this.storageService.getUrl(snapshot.filePath);
    }
}
