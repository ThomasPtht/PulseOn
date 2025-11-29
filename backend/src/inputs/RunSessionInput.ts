import { RunSession } from "../entities/RunSession";

import { Field, InputType } from "type-graphql";

@InputType()
export class RunSessionInput implements Partial<RunSession> {

    @Field()
    date: Date;

    @Field()
    title: string;

    @Field()
    distance: number; // in kilometers

    @Field()
    duration: number; // in seconds

    @Field()
    avgPace: string; // in min/km

    @Field()
    elevation: number; // in meters

}