import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, type: SchemaTypes.ObjectId })
  movie_id: ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
