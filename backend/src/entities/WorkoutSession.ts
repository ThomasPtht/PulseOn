import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { SetEntity } from "./Set";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class WorkoutSession extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    date: Date;


    @Field(() => User)
    @ManyToOne(() => User, user => user.workoutSession, { onDelete: "CASCADE" })
    user: User;

    @Field(() => [SetEntity])
    @OneToMany(() => SetEntity, set => set.workoutSession, { cascade: true })
    sets: SetEntity[];

}