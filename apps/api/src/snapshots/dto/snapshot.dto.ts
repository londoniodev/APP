/**
 * Response DTO for snapshot endpoints.
 */
export class SnapshotResponseDto {
    /** Public URL to access the snapshot image */
    url: string;

    /** When the snapshot was captured */
    timestamp: string;

    /** Image width in pixels */
    width?: number;

    /** Image height in pixels */
    height?: number;
}
