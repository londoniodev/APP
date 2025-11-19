import { CameraType } from '../entities/camera.entity';

export class CreateCameraDto {
    name: string;
    rtspUrl: string;
    location?: string;
    type?: CameraType;
}
