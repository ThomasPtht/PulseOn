import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { SetEntity } from "./Set";
import { ObjectType, Field, ID } from "type-graphql";

@ObjectType()
@Entity()
export class Exercise extends BaseEntity {
    @Field(() => ID)
    @PrimaryGeneratedColumn()
    id: number;

    @Field()
    @Column()
    name: string;

    @Field(() => [SetEntity])
    @OneToMany(() => SetEntity, set => set.exercise, { cascade: true })
    sets: SetEntity[];
}