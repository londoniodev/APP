import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModuleConfigsService } from './module-configs.service';
import { ModuleConfigsController } from './module-configs.controller';
import { ModuleConfig } from './entities/module-config.entity';

@Module({
    imports: [TypeOrmModule.forFeature([ModuleConfig])],
    controllers: [ModuleConfigsController],
    providers: [ModuleConfigsService],
    exports: [ModuleConfigsService]
})
export class ModuleConfigsModule { }
