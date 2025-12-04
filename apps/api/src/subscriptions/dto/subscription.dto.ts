import { PlanType } from '../entities/subscription.entity';

/**
 * DTO for creating a new subscription (admin only).
 */
export class CreateSubscriptionDto {
    userId: string;
    moduleId: string;
    planType?: PlanType;
    expiresAt?: Date;
}

/**
 * Response DTO for user's active modules.
 */
export class UserModulesResponseDto {
    /** List of active module IDs */
    modules: string[];

    /** Full subscription details */
    subscriptions: {
        moduleId: string;
        planType: string;
        expiresAt: string | null;
    }[];
}
