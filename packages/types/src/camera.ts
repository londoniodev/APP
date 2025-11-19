export enum CameraType {
    COMMERCIAL = 'COMMERCIAL',
    HOME = 'HOME',
}

export interface ICamera {
    id: string;
    name: string;
    rtspUrl: string;
    location: string;
    type: CameraType;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface CreateCameraDto {
    name: string;
    rtspUrl: string;
    location: string;
    type: CameraType;
}
