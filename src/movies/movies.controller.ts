import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movies.dto';
import { Movie } from './schemas/movies.schema';
import { JwtAuthGuard } from '../auth/utils/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('movies')
@ApiBearerAuth()
@ApiTags('Movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) { }

    @ApiOperation({ summary: 'Registrar um novo filme' })
    @ApiResponse({
        status: 201,
        description: 'UsuáFilmeio registrado com sucesso',
        type: Movie
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - O filme já existe',
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Dados inválidos',
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado',
    })
    @Post()
    createMovie(@Body() createMovieDto: CreateMovieDto): Promise<Movie> {
        return this.moviesService.create(createMovieDto);
    }

    @ApiOperation({ summary: 'Listar todos os filmes' })
    @ApiResponse({
        status: 200,
        description: 'Filmes retornados com sucesso',
        type: [Movie]
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuários não encontrados',
    })
    @Get()
    findAllMovies(): Promise<Movie[]> {
        return this.moviesService.findAll();
    }

    @ApiOperation({ summary: 'Listar um filme buscando pelo ID' })
    @ApiResponse({
        status: 200,
        description: 'Usuário retornado com sucesso',
        type: Movie
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'Filme não encontrado',
    })
    @Get(':id')
    findMovieById(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.findById(id);
    }

    @ApiOperation({ summary: 'Atualizar um filme' })
    @ApiResponse({
        status: 200,
        description: 'Filme atualizado com sucesso',
        type: Movie
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - Dados inválidos',
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'Filme não encontrado',
    })
    @Put(':id')
    updateMovie(
        @Param('id') id: string,
        @Body() updateMovieDto: UpdateMovieDto,
    ): Promise<Movie> {
        return this.moviesService.update(id, updateMovieDto);
    }

    @ApiOperation({ summary: 'Deletar um filme' })
    @ApiResponse({
        status: 200,
        description: 'Filme deletado com sucesso'
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'Filme não encontrado',
    })
    @Delete(':id')
    deleteMovie(@Param('id') id: string): Promise<Movie> {
        return this.moviesService.delete(id);
    }
}
