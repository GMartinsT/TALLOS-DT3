import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId, SchemaTypes } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type SessionDocument = Session & Document;

@Schema()
export class Session {
  @ApiProperty({
    example: '615d894972454f001f74c236',
    description: 'ID do usuário associado à sessão',
  })
  @Prop({ required: true, type: SchemaTypes.ObjectId, unique: true })
  user_id: ObjectId;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVpeiBGZXJuYW5kbyIsImVtYWlsIjoibGZAbWFpbC5jb20iLCJfaWQiOiI2NDhlMWNkNjJjNzBlYjdiNmMwOTE4YTYiLCJpYXQiOjE2ODcxODUxMzgsImV4cCI6MTY4NzI3MTUzOH0.et1LBIRaarGgQqXdly_uyUVu_2XNNhp6Z37ezVNncM0',
    description: 'Token JWT da sessão',
  })
  @Prop({ required: true })
  jwt: string;
}

export const SessionSchema = SchemaFactory.createForClass(Session);
