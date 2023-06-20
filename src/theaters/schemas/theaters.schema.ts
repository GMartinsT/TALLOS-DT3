import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type TheaterDocument = Theater & Document;

@Schema()
export class Theater {
  @ApiProperty({ example: 1, description: 'ID do teatro' })
  @Prop({ required: true, unique: true })
  theaterId: number;

  @ApiProperty({ example: { lat: 123.456, long: -12.345 }, description: 'Localização do teatro' })
  @Prop({ required: true, type: Object })
  location: object;
}

export const TheaterSchema = SchemaFactory.createForClass(Theater);
