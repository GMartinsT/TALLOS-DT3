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

  async findAll(): Promise<Movie[]> {
    return this.movieModel.find().exec();
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
}
