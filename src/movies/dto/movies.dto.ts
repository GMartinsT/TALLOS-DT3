export class CreateMovieDto {
    plot: string;
    genres: string[];
    runtime: number;
    cast: string[];
    poster: string;
    title: string;
    fullplot: string;
    languages: string[];
    released: Date;
    directors: string[];
    rated: string;
    awards: object;
    lastupdated: string;
    year: number;
    imdb: object;
    countries: string[];
    type: string;
    tomatoes: object;
  }
  
  export class UpdateMovieDto {
    plot?: string;
    genres?: string[];
    runtime?: number;
    cast?: string[];
    poster?: string;
    title?: string;
    fullplot?: string;
    languages?: string[];
    released?: Date;
    directors?: string[];
    rated?: string;
    awards?: object;
    lastupdated?: string;
    year?: number;
    imdb?: object;
    countries?: string[];
    type?: string;
    tomatoes?: object;
  }
  