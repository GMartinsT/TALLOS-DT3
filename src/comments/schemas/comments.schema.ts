import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type CommentDocument = Comment & Document;

@Schema()
export class Comment {
  @ApiProperty({ example: 'Name Lastname', description: 'Nome do autor do comentário' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'exemple@mail.com', description: 'E-mail do autor do comentário' })
  @Prop({ required: true })
  email: string;

  @ApiProperty({ example: '60a9a9ad1b61b41ac0eaa47a', description: 'ID do filme relacionado ao comentário' })
  @Prop({ required: true, type: SchemaTypes.ObjectId })
  movie_id: ObjectId;

  @ApiProperty({ example: 'Excelente filme!', description: 'Texto do comentário' })
  @Prop({ required: true })
  text: string;

  @ApiProperty({ example: '2023-05-30T12:00:00Z', description: 'Data do comentário' })
  @Prop({ required: true, type: Date })
  date: Date;
}

export const CommentSchema = SchemaFactory.createForClass(Comment);
