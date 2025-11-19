import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { CamerasService } from './cameras.service';
import { CreateCameraDto } from './dto/create-camera.dto';

@Controller('cameras')
export class CamerasController {
    constructor(private readonly camerasService: CamerasService) { }

    @Post()
    create(@Body() createCameraDto: CreateCameraDto) {
        return this.camerasService.create(createCameraDto);
    }

    @Get()
    findAll() {
        return this.camerasService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.camerasService.findOne(id);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.camerasService.remove(id);
    }
}
