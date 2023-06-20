import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movies.dto';
import { Movie } from './schemas/movies.schema';
import { JwtAuthGuard } from 'src/auth/utils/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('movies')
@ApiBearerAuth()
@ApiTags('Movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @Post()
    createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto);
    }

    @Get()
    findAllMovies(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @Get(':id')
    findMovieById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.findById(id);
    }

    @Put(':id')
    updateMovie(
        @Param('id') id: string,
        @Body() updateMovieDto: UpdateMovieDto,
    ): Promise<Movie> {
        return this.moviesService.update(id, updateMovieDto);
    }

    @Delete(':id')
    deleteMovie(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.delete(id);
    }
}
