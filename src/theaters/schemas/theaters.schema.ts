import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TheaterDocument = Theater & Document;

@Schema()
export class Theater {
    @Prop({ required: true })
    theaterId: number;

    @Prop({ required: true })
    location: object;
}

export const TheaterSchema = SchemaFactory.createForClass(Theater);