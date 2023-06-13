import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @Prop({ required: true })
  plot: string;

  @Prop({ required: true, type: [String] })
  genres: string[];

  @Prop({ required: true })
  runtime: number;

  @Prop({ required: true, type: [String] })
  cast: string[];

  @Prop({ required: true })
  poster: string;

  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  fullplot: string;

  @Prop({ required: true, type: [String] })
  languages: string[];

  @Prop({ required: true, type: Date })
  released: Date;

  @Prop({ required: true, type: [String] })
  directors: string[];

  @Prop({ required: true })
  rated: string;

  @Prop({ required: true })
  awards: object;

  @Prop({ required: true })
  lastupdated: string;

  @Prop({ required: true })
  year: number;

  @Prop({ required: true })
  imdb: object;

  @Prop({ required: true, type: [String] })
  countries: string[];

  @Prop({ required: true })
  type: string;

  @Prop({ required: true })
  tomatoes: object;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);
