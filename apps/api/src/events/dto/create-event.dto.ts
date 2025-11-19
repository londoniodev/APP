import { EventType } from '../entities/event.entity';

export class CreateEventDto {
    type: EventType;
    cameraId: string;
    description?: string;
    snapshotUrl?: string;
    videoUrl?: string;
}
