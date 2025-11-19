export enum EventType {
    SHOPLIFTING = 'SHOPLIFTING',
    INTRUSION = 'INTRUSION',
}

export interface IEvent {
    id: string;
    type: EventType;
    description: string;
    snapshotUrl?: string;
    videoUrl?: string;
    cameraId: string;
    createdAt: Date;
}

export interface CreateEventDto {
    type: EventType;
    description: string;
    snapshotUrl?: string;
    videoUrl?: string;
    cameraId: string;
}
