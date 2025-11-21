import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Camera } from '../../cameras/entities/camera.entity';

export enum UserRole {
    ADMIN = 'ADMIN',
    USER = 'USER',
    GUEST = 'GUEST',
}

@Entity()
export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ unique: true })
    email: string;

    @Column()
    password: string;

    @Column({
        type: 'enum',
        enum: UserRole,
        default: UserRole.USER,
    })
    role: UserRole;

    @OneToMany(() => Camera, (camera) => camera.owner)
    cameras: Camera[];

    @ManyToMany(() => Camera, (camera) => camera.sharedWith)
    @JoinTable()
    sharedCameras: Camera[];

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;
}
