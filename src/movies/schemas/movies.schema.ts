import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ApiProperty } from '@nestjs/swagger';

export type MovieDocument = Movie & Document;

@Schema()
export class Movie {
  @ApiProperty({ example: 'Three men hammer on an anvil and pass a bottle of beer around.', description: 'Descrição do enredo do filme' })
  @Prop({ required: true })
  plot: string;

  @ApiProperty({ example: ['Drama', 'Action'], description: 'Gêneros do filme' })
  @Prop({ required: true, type: [String] })
  genres: string[];

  @ApiProperty({ example: 120, description: 'Duração do filme em minutos' })
  @Prop({ required: true })
  runtime: number;

  @ApiProperty({ example: ['Charles Kayser', 'John Ott'], description: 'Elenco do filme' })
  @Prop({ required: true, type: [String] })
  cast: string[];

  @ApiProperty({ example: 'https://example.com/poster.jpg', description: 'URL do pôster do filme' })
  @Prop({ required: true })
  poster: string;

  @ApiProperty({ example: 'Movie Title', description: 'Título do filme' })
  @Prop({ required: true })
  title: string;

  @ApiProperty({ example: 'The full plot of the movie', description: 'Descrição completa do enredo do filme' })
  @Prop({ required: true })
  fullplot: string;

  @ApiProperty({ example: ['English', 'Spanish'], description: 'Idiomas do filme' })
  @Prop({ required: true, type: [String] })
  languages: string[];

  @ApiProperty({ example: '2023-01-01', description: 'Data de lançamento do filme' })
  @Prop({ required: true, type: Date })
  released: Date;

  @ApiProperty({ example: ['William K.L. Dickson', 'D.W. Griffith'], description: 'Diretores do filme' })
  @Prop({ required: true, type: [String] })
  directors: string[];

  @ApiProperty({ example: 'PG-13', description: 'Classificação do filme' })
  @Prop({ required: true })
  rated: string;

  @ApiProperty({ example: { wins: 5, nominations: 10 }, description: 'Prêmios do filme' })
  @Prop({ required: true, type: Object })
  awards: object;

  @ApiProperty({ example: '2023-05-30 10:00:00', description: 'Data da última atualização do filme' })
  @Prop({ required: true })
  lastupdated: string;

  @ApiProperty({ example: 2023, description: 'Ano de lançamento do filme' })
  @Prop({ required: true })
  year: number;

  @ApiProperty({ example: { rating: 7.5, votes: 1000 }, description: 'Informações do IMDb do filme' })
  @Prop({ required: true, type: Object })
  imdb: object;

  @ApiProperty({ example: ['USA', 'UK'], description: 'Países de origem do filme' })
  @Prop({ required: true, type: [String] })
  countries: string[];

  @ApiProperty({ example: 'movie', description: 'Tipo de filme' })
  @Prop({ required: true })
  type: string;

  @ApiProperty({ example: { rating: 6.5, reviews: 50 }, description: 'Informações do Rotten Tomatoes do filme' })
  @Prop({ required: true, type: Object })
  tomatoes: object;
}

export const MovieSchema = SchemaFactory.createForClass(Movie);