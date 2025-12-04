import {
    Controller,
    Post,
    Get,
    Delete,
    Param,
    Body,
    UseGuards,
    Request,
    NotFoundException
} from '@nestjs/common';
import { ModuleConfigsService } from './module-configs.service';
import { SaveModuleConfigDto } from './dto/save-module-config.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('cameras/:cameraId/modules')
@UseGuards(JwtAuthGuard)
export class ModuleConfigsController {
    constructor(private readonly moduleConfigsService: ModuleConfigsService) { }

    @Post(':moduleId/config')
    async saveConfig(
        @Param('cameraId') cameraId: string,
        @Param('moduleId') moduleId: string,
        @Body() dto: SaveModuleConfigDto,
        @Request() req
    ) {
        const userId = req.user.userId;
        const config = await this.moduleConfigsService.saveConfig(
            cameraId,
            moduleId,
            userId,
            dto
        );
        return {
            success: true,
            config
        };
    }

    @Get(':moduleId/config')
    async getConfig(
        @Param('cameraId') cameraId: string,
        @Param('moduleId') moduleId: string,
        @Request() req
    ) {
        const userId = req.user.userId;
        const config = await this.moduleConfigsService.getConfig(
            cameraId,
            moduleId,
            userId
        );

        if (!config) {
            throw new NotFoundException('Configuration not found');
        }

        return config;
    }

    @Get('configs')
    async getAllConfigs(
        @Param('cameraId') cameraId: string,
        @Request() req
    ) {
        const userId = req.user.userId;
        const configs = await this.moduleConfigsService.getAllConfigsForCamera(
            cameraId,
            userId
        );
        return { configs };
    }

    @Delete(':moduleId/config')
    async deleteConfig(
        @Param('cameraId') cameraId: string,
        @Param('moduleId') moduleId: string,
        @Request() req
    ) {
        const userId = req.user.userId;
        await this.moduleConfigsService.deleteConfig(cameraId, moduleId, userId);
        return { success: true };
    }
}
