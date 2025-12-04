import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CamerasModule } from './cameras/cameras.module';
import { Camera } from './cameras/entities/camera.entity';
import { EventsModule } from './events/events.module';
import { ModuleConfigsModule } from './module-configs/module-configs.module';
import { Event } from './events/entities/event.entity';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { ModuleConfig } from './module-configs/entities/module-config.entity';
import { StorageModule } from './common/storage/storage.module';
import { SnapshotsModule } from './snapshots/snapshots.module';
import { Snapshot } from './snapshots/entities/snapshot.entity';

@Module({
  imports: [
    // Database
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Camera, Event, User, ModuleConfig, Snapshot],
      synchronize: true, // Only for dev
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    // Static files (for uploaded snapshots)
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    // Feature modules
    StorageModule,
    CamerasModule,
    EventsModule,
    UsersModule,
    AuthModule,
    ModuleConfigsModule,
    SnapshotsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
