import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum CameraType {
  COMMERCIAL = 'COMMERCIAL',
  HOME = 'HOME',
}

@Entity()
export class Camera {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  rtspUrl: string;

  @Column({ nullable: true })
  location: string;

  @Column({
    type: 'enum',
    enum: CameraType,
    default: CameraType.COMMERCIAL,
  })
  type: CameraType;

  @Column({ default: true })
  isActive: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
