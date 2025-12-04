import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SubscriptionsController } from './subscriptions.controller';
import { SubscriptionsService } from './subscriptions.service';
import { Subscription } from './entities/subscription.entity';

/**
 * Module for user subscriptions and feature flags.
 * 
 * @remarks
 * Provides endpoints for:
 * - Users to check their active modules
 * - Admins to manage subscriptions
 */
@Module({
    imports: [TypeOrmModule.forFeature([Subscription])],
    controllers: [SubscriptionsController],
    providers: [SubscriptionsService],
    exports: [SubscriptionsService]
})
export class SubscriptionsModule { }
