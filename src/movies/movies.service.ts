import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Movie, MovieDocument } from './schemas/movies.schema';
import { CreateMovieDto, UpdateMovieDto } from './dto/movies.dto';

@Injectable()
export class MoviesService {
  constructor(
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async findAll(
    page = 1,
    perPage = 10,
  ): Promise<{
    data: { _id: string; title: string; genres: string; released: string }[];
    count: number;
  }> {
    const skip = (page - 1) * perPage;
    const data = await this.movieModel
      .find({}, { _id: 1, title: 1, genres: 1, released: 1 })
      .sort({ released: -1 })
      .skip(skip)
      .limit(perPage)
      .exec();

    const formattedData = data.map((movie) => ({
      _id: movie._id,
      title: movie.title,
      genres: this.translateGenres(movie.genres),
      released: this.formatDate(movie.released),
    }));

    const count = await this.getMoviesCount();
    return {
      data: formattedData,
      count,
    };
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  translateGenres(genres: string[]): string {
    const genreMapping = {
      Sport: 'Esporte',
      Romance: 'Romance',
      Action: 'Ação',
      Drama: 'Drama',
      Comedy: 'Comédia',
      History: 'História',
      Biography: 'Biografia',
      Animation: 'Animação',
      Music: 'Música',
      Horror: 'Terror',
      Thriller: 'Suspense',
      Fantasy: 'Fantasia',
      'Sci-Fi': 'Ficção Científica',
      War: 'Guerra',
      Musical: 'Musical',
      'Film-Noir': 'Film Noir',
      News: 'Notícias',
      Western: 'Faroeste',
      Documentary: 'Documentário',
      'Talk-Show': 'Talk Show',
      Short: 'Curta-metragem',
      Crime: 'Crime',
      Mystery: 'Mistério',
      Adventure: 'Aventura',
      Family: 'Família',
    };
    return genres.map((genre) => genreMapping[genre]).join(', ');
  }

  async findById(id: string): Promise<Movie> {
    return this.movieModel.findById(id).exec();
  }

  async create(createMovieDto: CreateMovieDto): Promise<Movie> {
    const createdMovie = new this.movieModel(createMovieDto);
    return createdMovie.save();
  }

  async update(id: string, updateMovieDto: UpdateMovieDto): Promise<Movie> {
    return this.movieModel
      .findByIdAndUpdate(id, updateMovieDto, { new: true })
      .exec();
  }

  async delete(id: string): Promise<Movie> {
    return this.movieModel.findByIdAndRemove(id).exec();
  }

  async getMoviesCount(): Promise<number> {
    return this.movieModel.countDocuments().exec();
  }
}
