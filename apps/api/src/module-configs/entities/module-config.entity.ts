import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    ManyToOne,
    Index
} from 'typeorm';
import { Camera } from '../../cameras/entities/camera.entity';
import { User } from '../../users/entities/user.entity';

@Entity('camera_module_configs')
@Index(['camera', 'moduleId'], { unique: true })
export class ModuleConfig {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Camera, { onDelete: 'CASCADE' })
    camera: Camera;

    @Column()
    cameraId: string;

    @ManyToOne(() => User, { onDelete: 'CASCADE' })
    user: User;

    @Column()
    userId: string;

    @Column({ length: 100 })
    moduleId: string; // 'perimeter-security', 'ppe-detection', etc.

    @Column({ type: 'jsonb' })
    config: Record<string, any>; // La configuración completa del módulo

    @Column({ default: true })
    enabled: boolean;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
