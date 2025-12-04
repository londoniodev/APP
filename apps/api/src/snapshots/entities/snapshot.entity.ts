import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    ManyToOne,
    Index
} from 'typeorm';
import { Camera } from '../../cameras/entities/camera.entity';

/**
 * Entity for storing camera snapshot metadata.
 * The actual image file is stored in the storage service.
 * 
 * @remarks
 * Only the most recent snapshot per camera is kept (unique constraint).
 * Old snapshots are replaced when a new one is captured.
 */
@Entity('camera_snapshots')
@Index(['camera'], { unique: true })
export class Snapshot {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @ManyToOne(() => Camera, { onDelete: 'CASCADE' })
    camera: Camera;

    @Column()
    cameraId: string;

    /** Path/key in the storage service */
    @Column({ length: 500 })
    filePath: string;

    /** Image width in pixels */
    @Column({ nullable: true })
    width: number;

    /** Image height in pixels */
    @Column({ nullable: true })
    height: number;

    /** When the snapshot was captured */
    @CreateDateColumn()
    capturedAt: Date;
}
