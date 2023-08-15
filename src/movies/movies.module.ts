import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { MovieSchema } from './schemas/movies.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Movie', schema: MovieSchema }]),
  ],
  controllers: [MoviesController],
  providers: [MoviesService],
})
export class MoviesModule {}
