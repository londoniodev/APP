import {
    Controller,
    Get,
    Post,
    Delete,
    Param,
    Body,
    UseGuards,
    Request
} from '@nestjs/common';
import { SubscriptionsService } from './subscriptions.service';
import { CreateSubscriptionDto, UserModulesResponseDto } from './dto/subscription.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

/**
 * Controller for subscription/feature flag endpoints.
 * 
 * @remarks
 * User endpoints are protected by JWT auth.
 * Admin endpoints should additionally check for admin role (TODO).
 */
@Controller()
@UseGuards(JwtAuthGuard)
export class SubscriptionsController {
    constructor(private readonly subscriptionsService: SubscriptionsService) { }

    /**
     * Gets active modules for the authenticated user.
     * Used by frontend to determine which features to show.
     * 
     * @returns List of active module IDs and subscription details
     */
    @Get('users/me/modules')
    async getMyModules(@Request() req): Promise<UserModulesResponseDto> {
        const userId = req.user.userId;
        return this.subscriptionsService.getUserModules(userId);
    }

    /**
     * Checks if user has access to a specific module.
     * 
     * @param moduleId - Module identifier
     * @returns { hasAccess: boolean }
     */
    @Get('users/me/modules/:moduleId')
    async checkModuleAccess(
        @Param('moduleId') moduleId: string,
        @Request() req
    ): Promise<{ hasAccess: boolean }> {
        const userId = req.user.userId;
        const hasAccess = await this.subscriptionsService.hasModule(userId, moduleId);
        return { hasAccess };
    }

    // ========== ADMIN ENDPOINTS ==========

    /**
     * Creates a subscription for a user (admin only).
     * 
     * @param dto - Subscription creation data
     * @returns Created subscription
     */
    @Post('admin/subscriptions')
    async createSubscription(@Body() dto: CreateSubscriptionDto) {
        // TODO: Add admin role check
        const subscription = await this.subscriptionsService.createSubscription(dto);
        return { success: true, subscription };
    }

    /**
     * Grants all modules to a user (admin only).
     * 
     * @param userId - UUID of the user
     */
    @Post('admin/users/:userId/grant-all')
    async grantAllModules(@Param('userId') userId: string) {
        // TODO: Add admin role check
        await this.subscriptionsService.grantAllModules(userId);
        return { success: true, message: 'All modules granted' };
    }

    /**
     * Deactivates a subscription (admin only).
     * 
     * @param subscriptionId - UUID of the subscription
     */
    @Delete('admin/subscriptions/:id')
    async deactivateSubscription(@Param('id') subscriptionId: string) {
        // TODO: Add admin role check
        await this.subscriptionsService.deactivateSubscription(subscriptionId);
        return { success: true };
    }
}
