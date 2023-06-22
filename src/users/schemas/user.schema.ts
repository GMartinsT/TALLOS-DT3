import { ApiProperty } from '@nestjs/swagger';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, ObjectId } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User {
  @ApiProperty({ example: '614e1cd62c70eb7b6c0918a6', description: 'ID do usuário' })
  _id: ObjectId;

  @ApiProperty({ example: 'Name Lastname', description: 'Nome do usuário' })
  @Prop({ required: true })
  name: string;

  @ApiProperty({ example: 'exemple@mail.com', description: 'E-mail do usuário' })
  @Prop({ required: true, unique: true })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuário' })
  @Prop({ required: true })
  password: string;


  constructor(User?: Partial<User>) {
    this.name = User?.name;
    this.email = User?.email;
    this.password = User?.password;
}
}

export const UserSchema = SchemaFactory.createForClass(User);
