import { Injectable, Logger, ConflictException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, LessThanOrEqual, MoreThan, IsNull, Or } from 'typeorm';
import { Subscription, PlanType } from './entities/subscription.entity';
import { CreateSubscriptionDto, UserModulesResponseDto } from './dto/subscription.dto';

/**
 * Service for managing user subscriptions and feature flags.
 * 
 * @remarks
 * Handles CRUD operations for subscriptions and provides
 * methods to check which modules a user has access to.
 * 
 * @example
 * ```typescript
 * // Check if user has access to a module
 * const hasAccess = await subscriptionsService.hasModule(userId, 'perimeter-security');
 * 
 * // Get all active modules for a user
 * const modules = await subscriptionsService.getUserModules(userId);
 * ```
 */
@Injectable()
export class SubscriptionsService {
    private readonly logger = new Logger(SubscriptionsService.name);

    constructor(
        @InjectRepository(Subscription)
        private subscriptionRepository: Repository<Subscription>,
    ) { }

    /**
     * Gets all active modules for a user.
     * Filters out expired subscriptions automatically.
     * 
     * @param userId - UUID of the user
     * @returns Object containing module IDs and full subscription details
     */
    async getUserModules(userId: string): Promise<UserModulesResponseDto> {
        const now = new Date();

        const subscriptions = await this.subscriptionRepository.find({
            where: {
                userId,
                active: true,
                // Not expired: expiresAt is null OR expiresAt > now
            }
        });

        // Filter expired subscriptions
        const activeSubscriptions = subscriptions.filter(sub =>
            sub.expiresAt === null || sub.expiresAt > now
        );

        return {
            modules: activeSubscriptions.map(s => s.moduleId),
            subscriptions: activeSubscriptions.map(s => ({
                moduleId: s.moduleId,
                planType: s.planType,
                expiresAt: s.expiresAt?.toISOString() ?? null
            }))
        };
    }

    /**
     * Checks if a user has access to a specific module.
     * 
     * @param userId - UUID of the user
     * @param moduleId - Module identifier
     * @returns true if user has active subscription
     */
    async hasModule(userId: string, moduleId: string): Promise<boolean> {
        const { modules } = await this.getUserModules(userId);
        return modules.includes(moduleId);
    }

    /**
     * Creates a new subscription for a user (admin only).
     * 
     * @param dto - Subscription creation data
     * @returns Created subscription
     * @throws ConflictException if subscription already exists
     */
    async createSubscription(dto: CreateSubscriptionDto): Promise<Subscription> {
        // Check for existing subscription
        const existing = await this.subscriptionRepository.findOne({
            where: { userId: dto.userId, moduleId: dto.moduleId }
        });

        if (existing) {
            // Reactivate if inactive
            if (!existing.active) {
                existing.active = true;
                existing.expiresAt = dto.expiresAt ?? null;
                existing.planType = dto.planType ?? PlanType.BASIC;
                return this.subscriptionRepository.save(existing);
            }
            throw new ConflictException('Subscription already exists');
        }

        const subscription = this.subscriptionRepository.create({
            userId: dto.userId,
            moduleId: dto.moduleId,
            planType: dto.planType ?? PlanType.BASIC,
            expiresAt: dto.expiresAt ?? null,
            active: true
        });

        this.logger.log(`Created subscription: ${dto.userId} -> ${dto.moduleId}`);
        return this.subscriptionRepository.save(subscription);
    }

    /**
     * Deactivates a subscription.
     * 
     * @param subscriptionId - UUID of the subscription
     */
    async deactivateSubscription(subscriptionId: string): Promise<void> {
        const subscription = await this.subscriptionRepository.findOne({
            where: { id: subscriptionId }
        });

        if (!subscription) {
            throw new NotFoundException('Subscription not found');
        }

        subscription.active = false;
        await this.subscriptionRepository.save(subscription);
        this.logger.log(`Deactivated subscription: ${subscriptionId}`);
    }

    /**
     * Grants all modules to a user (for admins or enterprise plans).
     * 
     * @param userId - UUID of the user
     * @param planType - Plan type to assign
     */
    async grantAllModules(userId: string, planType: PlanType = PlanType.ENTERPRISE): Promise<void> {
        const allModules = [
            'perimeter-security', 'ppe-detection', 'hazard-zones', 'restricted-hours',
            'intrusion-detection', 'pet-monitoring', 'baby-monitor', 'elderly-care',
            'fall-detection', 'vehicle-tracking', 'license-plate', 'people-counting',
            'heatmaps', 'crowd-detection', 'object-left-behind', 'loitering-detection',
            'line-crossing', 'fire-smoke-detection', 'abandoned-vehicle', 'tailgating-detection'
        ];

        for (const moduleId of allModules) {
            try {
                await this.createSubscription({ userId, moduleId, planType });
            } catch (e) {
                // Ignore if already exists
            }
        }

        this.logger.log(`Granted all modules to user: ${userId}`);
    }
}
