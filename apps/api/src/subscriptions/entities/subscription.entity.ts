import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Index
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

/**
 * Available subscription plan types.
 */
export enum PlanType {
    TRIAL = 'trial',
    BASIC = 'basic',
    PRO = 'pro',
    ENTERPRISE = 'enterprise'
}

/**
 * Entity representing a user's subscription to a specific module.
 * 
 * @remarks
 * Each subscription grants access to one module.
 * A user can have multiple subscriptions (one per module).
 * 
 * @example
 * ```typescript
 * // User has access to perimeter-security
 * { userId: 'abc', moduleId: 'perimeter-security', active: true }
 * ```
 */
@Entity('user_subscriptions')
@Index(['user', 'moduleId'], { unique: true })
export class Subscription {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    userId: string;

    /** Module identifier, e.g. 'perimeter-security' */
    @Column({ length: 100 })
    moduleId: string;

    /** Subscription plan type */
    @Column({
        type: 'enum',
        enum: PlanType,
        default: PlanType.BASIC
    })
    planType: PlanType;

    /** Whether this subscription is currently active */
    @Column({ default: true })
    active: boolean;

    /** When the subscription started */
    @CreateDateColumn()
    startsAt: Date;

    /** When the subscription expires (null = never) */
    @Column({ type: 'timestamp', nullable: true })
    expiresAt: Date | null;

    @CreateDateColumn()
    createdAt: Date;
}
