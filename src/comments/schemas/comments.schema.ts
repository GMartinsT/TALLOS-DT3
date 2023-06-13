import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  movie_id: ObjectId;

  @Prop({ required: true })
  text: string;

  @Prop({ required: true })
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
