import {
    Controller,
    Get,
    Post,
    Param,
    UseGuards,
    Request
} from '@nestjs/common';
import { SnapshotsService } from './snapshots.service';
import { SnapshotResponseDto } from './dto/snapshot.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * Controller for camera snapshot endpoints.
 * 
 * @remarks
 * All endpoints require JWT authentication.
 * Snapshots are cached for 5 minutes to reduce load.
 */
@Controller('cameras/:cameraId/snapshot')
@UseGuards(JwtAuthGuard)
export class SnapshotsController {
    constructor(private readonly snapshotsService: SnapshotsService) { }

    /**
     * Gets the latest snapshot for a camera.
     * Returns cached snapshot if less than 5 minutes old.
     * 
     * @param cameraId - UUID of the camera
     * @param req - Request object with authenticated user
     * @returns Snapshot URL and metadata
     */
    @Get()
    async getSnapshot(
        @Param('cameraId') cameraId: string,
        @Request() req
    ): Promise<SnapshotResponseDto> {
        const userId = req.user.userId;
        const snapshot = await this.snapshotsService.getOrCapture(cameraId, userId);

        return {
            url: this.snapshotsService.getSnapshotUrl(snapshot),
            timestamp: snapshot.capturedAt.toISOString(),
            width: snapshot.width,
            height: snapshot.height
        };
    }

    /**
     * Forces capture of a new snapshot, bypassing cache.
     * 
     * @param cameraId - UUID of the camera
     * @param req - Request object with authenticated user
     * @returns Newly captured snapshot URL and metadata
     */
    @Post('refresh')
    async refreshSnapshot(
        @Param('cameraId') cameraId: string,
        @Request() req
    ): Promise<SnapshotResponseDto> {
        const userId = req.user.userId;
        const snapshot = await this.snapshotsService.forceCapture(cameraId, userId);

        return {
            url: this.snapshotsService.getSnapshotUrl(snapshot),
            timestamp: snapshot.capturedAt.toISOString(),
            width: snapshot.width,
            height: snapshot.height
        };
    }
}
