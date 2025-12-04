import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SnapshotsController } from './snapshots.controller';
import { SnapshotsService } from './snapshots.service';
import { Snapshot } from './entities/snapshot.entity';
import { CamerasModule } from '../cameras/cameras.module';

/**
 * Module for camera snapshot functionality.
 * 
 * @remarks
 * Depends on:
 * - StorageModule (global) - for file storage
 * - CamerasModule - for camera validation
 */
@Module({
    imports: [
        TypeOrmModule.forFeature([Snapshot]),
        CamerasModule
    ],
    controllers: [SnapshotsController],
    providers: [SnapshotsService],
    exports: [SnapshotsService]
})
export class SnapshotsModule { }
