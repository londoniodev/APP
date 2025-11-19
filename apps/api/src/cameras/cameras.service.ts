import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Camera } from './entities/camera.entity';
import { CreateCameraDto } from './dto/create-camera.dto';

@Injectable()
export class CamerasService {
    constructor(
        @InjectRepository(Camera)
        private camerasRepository: Repository<Camera>,
    ) { }

    create(createCameraDto: CreateCameraDto) {
        const camera = this.camerasRepository.create(createCameraDto);
        return this.camerasRepository.save(camera);
    }

    findAll() {
        return this.camerasRepository.find();
    }

    findOne(id: string) {
        return this.camerasRepository.findOneBy({ id });
    }

    async remove(id: string) {
        await this.camerasRepository.delete(id);
        return { deleted: true };
    }
}
