import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { ObjectType, Field, ID, Int, Float } from "type-graphql";

@ObjectType()
@Entity()
export class RunSession extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    date: Date;

    @Field(() => Float)
    @Column("float")
    distance: number; // in kilometers

    @Field(() => Int)
    @Column("int")
    duration: number; // in seconds

    @Field()
    @Column()
    avgPace: string; // in min/km

    @Field(() => Int)
    @Column()
    elevation: number; // in meters

    @Field(() => User)
    @ManyToOne(() => User, user => user.runSessions, { onDelete: "CASCADE" })
    user: User;
} 