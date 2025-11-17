import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class WorkoutSession extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    date: Date;
    
    @Column()
    name: string;

    @Column("int")
    duration: number; // in minutes
}