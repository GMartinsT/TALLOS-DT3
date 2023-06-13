import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  user_id: ObjectId;

  @Prop({ required: true })
  jwt: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
