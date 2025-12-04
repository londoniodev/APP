import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModuleConfig } from './entities/module-config.entity';
import { SaveModuleConfigDto } from './dto/save-module-config.dto';

@Injectable()
export class ModuleConfigsService {
    constructor(
        @InjectRepository(ModuleConfig)
        private moduleConfigRepository: Repository<ModuleConfig>,
    ) { }

    async saveConfig(
        cameraId: string,
        moduleId: string,
        userId: string,
        dto: SaveModuleConfigDto
    ): Promise<ModuleConfig> {
        // Buscar si ya existe una configuración
        let existing = await this.moduleConfigRepository.findOne({
            where: { cameraId, moduleId, userId }
        });

        if (existing) {
            // Actualizar
            existing.config = dto.config;
            if (dto.enabled !== undefined) {
                existing.enabled = dto.enabled;
            }
            return this.moduleConfigRepository.save(existing);
        } else {
            // Crear nueva
            const newConfig = this.moduleConfigRepository.create({
                cameraId,
                moduleId: dto.moduleId,
                userId,
                config: dto.config,
                enabled: dto.enabled ?? true
            });
            return this.moduleConfigRepository.save(newConfig);
        }
    }

    async getConfig(
        cameraId: string,
        moduleId: string,
        userId: string
    ): Promise<ModuleConfig | null> {
        return this.moduleConfigRepository.findOne({
            where: { cameraId, moduleId, userId }
        });
    }

    async getAllConfigsForCamera(
        cameraId: string,
        userId: string
    ): Promise<ModuleConfig[]> {
        return this.moduleConfigRepository.find({
            where: { cameraId, userId },
            order: { createdAt: 'DESC' }
        });
    }

    async deleteConfig(
        cameraId: string,
        moduleId: string,
        userId: string
    ): Promise<void> {
        const config = await this.getConfig(cameraId, moduleId, userId);
        if (!config) {
            throw new NotFoundException('Configuration not found');
        }
        await this.moduleConfigRepository.remove(config);
    }
}
