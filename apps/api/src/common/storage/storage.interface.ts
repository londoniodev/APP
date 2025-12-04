/**
 * Interface for storage services.
 * Implements Strategy Pattern to allow swapping between Local, S3, etc.
 * 
 * @example
 * ```typescript
 * // Inject via DI
 * constructor(@Inject('IStorageService') private storage: IStorageService) {}
 * 
 * // Usage
 * const url = await this.storage.save('snapshots/cam123.jpg', buffer);
 * ```
 */
export interface IStorageService {
    /**
     * Saves a file to storage.
     * @param key - Unique identifier/path for the file
     * @param buffer - File contents as Buffer
     * @returns Public URL to access the file
     */
    save(key: string, buffer: Buffer): Promise<string>;

    /**
     * Gets the public URL for a stored file.
     * @param key - Unique identifier/path for the file
     * @returns Public URL
     */
    getUrl(key: string): string;

    /**
     * Deletes a file from storage.
     * @param key - Unique identifier/path for the file
     */
    delete(key: string): Promise<void>;

    /**
     * Checks if a file exists.
     * @param key - Unique identifier/path for the file
     */
    exists(key: string): Promise<boolean>;
}
