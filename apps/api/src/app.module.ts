import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.DATABASE_URL,
      entities: [Camera, Event, User, ModuleConfig],
      synchronize: true, // Only for dev
      ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
    }),
    CamerasModule,
    EventsModule,
    UsersModule,
    AuthModule,
    ModuleConfigsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
