import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Camera } from '../../cameras/entities/camera.entity';

export enum EventType {
    SHOPLIFTING = 'SHOPLIFTING',
    INTRUSION = 'INTRUSION',
}

@Entity()
export class Event {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: 'enum',
        enum: EventType,
    })
    type: EventType;

    @Column({ nullable: true })
    description: string;

    @Column({ nullable: true })
    snapshotUrl: string;

    @Column({ nullable: true })
    videoUrl: string;

    @Column()
    cameraId: string;

    @ManyToOne(() => Camera, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'cameraId' })
    camera: Camera;

    @CreateDateColumn()
    createdAt: Date;
}
