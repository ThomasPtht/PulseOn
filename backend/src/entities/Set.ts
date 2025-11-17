import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class SetEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;
    @Column("int")
    repetitions: number
    @Column("float")
    weight: number; // in kilograms

    @Column()
    restSeconds: number; // in seconds

    @Column()
    isWarmup: boolean;
}