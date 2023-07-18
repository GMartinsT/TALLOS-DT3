import { ApiProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiProperty({
    example: 'A fascinating movie',
    description: 'Descrição do enredo do filme',
  })
  plot: string;

  @ApiProperty({
    example: ['Drama', 'Action'],
    description: 'Gêneros do filme',
  })
  genres: string[];

  @ApiProperty({ example: 120, description: 'Duração do filme em minutos' })
  runtime: number;

  @ApiProperty({
    example: ['Charles Kayser', 'John Ott'],
    description: 'Elenco do filme',
  })
  cast: string[];

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL do pôster do filme',
  })
  poster: string;

  @ApiProperty({ example: 'Movie Title', description: 'Título do filme' })
  title: string;

  @ApiProperty({
    example: 'The full plot of the movie',
    description: 'Descrição completa do enredo do filme',
  })
  fullplot: string;

  @ApiProperty({
    example: ['English', 'Spanish'],
    description: 'Idiomas do filme',
  })
  languages: string[];

  @ApiProperty({
    example: '2023-01-01',
    description: 'Data de lançamento do filme',
  })
  released: Date;

  @ApiProperty({
    example: ['William K.L. Dickson', 'D.W. Griffith'],
    description: 'Diretores do filme',
  })
  directors: string[];

  @ApiProperty({ example: 'PG-13', description: 'Classificação do filme' })
  rated: string;

  @ApiProperty({
    example: { wins: 5, nominations: 10 },
    description: 'Prêmios do filme',
  })
  awards: object;

  @ApiProperty({
    example: '2023-05-30 10:00:00',
    description: 'Data da última atualização do filme',
  })
  lastupdated: string;

  @ApiProperty({ example: 2023, description: 'Ano de lançamento do filme' })
  year: number;

  @ApiProperty({
    example: { rating: 7.5, votes: 1000 },
    description: 'Informações do IMDb do filme',
  })
  imdb: object;

  @ApiProperty({
    example: ['USA', 'UK'],
    description: 'Países de origem do filme',
  })
  countries: string[];

  @ApiProperty({ example: 'movie', description: 'Tipo de filme' })
  type: string;

  @ApiProperty({
    example: { rating: 6.5, reviews: 50 },
    description: 'Informações do Rotten Tomatoes do filme',
  })
  tomatoes: object;
}

export class UpdateMovieDto {
  @ApiProperty({
    example: 'A fascinating movie',
    description: 'Descrição do enredo do filme',
  })
  plot?: string;

  @ApiProperty({
    example: ['Drama', 'Action'],
    description: 'Gêneros do filme',
  })
  genres?: string[];

  @ApiProperty({ example: 120, description: 'Duração do filme em minutos' })
  runtime?: number;

  @ApiProperty({
    example: ['John Doe', 'Jane Smith'],
    description: 'Elenco do filme',
  })
  cast?: string[];

  @ApiProperty({
    example: 'https://example.com/poster.jpg',
    description: 'URL do pôster do filme',
  })
  poster?: string;

  @ApiProperty({ example: 'Movie Title', description: 'Título do filme' })
  title?: string;

  @ApiProperty({
    example: 'The full plot of the movie',
    description: 'Descrição completa do enredo do filme',
  })
  fullplot?: string;

  @ApiProperty({
    example: ['English', 'Spanish'],
    description: 'Idiomas do filme',
  })
  languages?: string[];

  @ApiProperty({
    example: '2023-01-01',
    description: 'Data de lançamento do filme',
  })
  released?: Date;

  @ApiProperty({
    example: ['John Doe', 'Jane Smith'],
    description: 'Diretores do filme',
  })
  directors?: string[];

  @ApiProperty({ example: 'PG-13', description: 'Classificação do filme' })
  rated?: string;

  @ApiProperty({
    example: { wins: 5, nominations: 10 },
    description: 'Prêmios do filme',
  })
  awards?: object;

  @ApiProperty({
    example: '2023-05-30 10:00:00',
    description: 'Data da última atualização do filme',
  })
  lastupdated?: string;

  @ApiProperty({ example: 2023, description: 'Ano de lançamento do filme' })
  year?: number;

  @ApiProperty({
    example: { rating: 7.5, votes: 1000 },
    description: 'Informações do IMDb do filme',
  })
  imdb?: object;

  @ApiProperty({
    example: ['USA', 'UK'],
    description: 'Países de origem do filme',
  })
  countries?: string[];

  @ApiProperty({ example: 'movie', description: 'Tipo de filme' })
  type?: string;

  @ApiProperty({
    example: { rating: 6.5, reviews: 50 },
    description: 'Informações do Rotten Tomatoes do filme',
  })
  tomatoes?: object;
}
