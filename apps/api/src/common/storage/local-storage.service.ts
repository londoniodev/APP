import { Injectable, Logger } from '@nestjs/common';
import { IStorageService } from './storage.interface';
import * as fs from 'fs/promises';
import * as path from 'path';

/**
 * Local filesystem storage implementation.
 * Stores files in the `uploads/` directory.
 * 
 * @remarks
 * This is intended for development. In production, use S3StorageService.
 * 
 * @example
 * ```typescript
 * const storage = new LocalStorageService();
 * await storage.save('snapshots/cam123.jpg', imageBuffer);
 * ```
 */
@Injectable()
export class LocalStorageService implements IStorageService {
    private readonly logger = new Logger(LocalStorageService.name);
    private readonly uploadDir: string;
    private readonly baseUrl: string;

    constructor() {
        // Store files in project root's uploads folder
        this.uploadDir = path.join(process.cwd(), 'uploads');
        this.baseUrl = process.env.API_BASE_URL || 'http://localhost:3001';
        this.ensureUploadDir();
    }

    /**
     * Ensures the upload directory exists.
     */
    private async ensureUploadDir(): Promise<void> {
        try {
            await fs.mkdir(this.uploadDir, { recursive: true });
        } catch (error) {
            this.logger.error('Failed to create upload directory', error);
        }
    }

    /**
     * @inheritdoc
     */
    async save(key: string, buffer: Buffer): Promise<string> {
        const filePath = path.join(this.uploadDir, key);
        const dirPath = path.dirname(filePath);

        // Ensure subdirectory exists
        await fs.mkdir(dirPath, { recursive: true });

        // Write file
        await fs.writeFile(filePath, buffer);
        this.logger.log(`Saved file: ${key}`);

        return this.getUrl(key);
    }

    /**
     * @inheritdoc
     */
    getUrl(key: string): string {
        return `${this.baseUrl}/uploads/${key}`;
    }

    /**
     * @inheritdoc
     */
    async delete(key: string): Promise<void> {
        const filePath = path.join(this.uploadDir, key);
        try {
            await fs.unlink(filePath);
            this.logger.log(`Deleted file: ${key}`);
        } catch (error) {
            // Ignore if file doesn't exist
            if ((error as NodeJS.ErrnoException).code !== 'ENOENT') {
                throw error;
            }
        }
    }

    /**
     * @inheritdoc
     */
    async exists(key: string): Promise<boolean> {
        const filePath = path.join(this.uploadDir, key);
        try {
            await fs.access(filePath);
            return true;
        } catch {
            return false;
        }
    }
}
