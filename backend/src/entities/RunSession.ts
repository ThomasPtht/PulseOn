import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class RunSession extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;

    @Column("float")
    distance: number; // in kilometers

    @Column("int")
    duration: number; // in seconds

    @Column()
    avgPace: string; // in min/km

    @Column()
    elevation: number; // in meters
} 