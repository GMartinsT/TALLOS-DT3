import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ required: true })
  user_id: ObjectId;

  @Prop({ required: true })
  jwt: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
