import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Query,
} from '@nestjs/common';
import { MoviesService } from './movies.service';
import { CreateMovieDto, UpdateMovieDto } from './dto/movies.dto';
import { Movie } from './schemas/movies.schema';
import { JwtAuthGuard } from '../auth/utils/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('movies')
@ApiBearerAuth()
@ApiTags('Movies')
export class MoviesController {
  constructor(private readonly moviesService: MoviesService) {}

  @ApiOperation({ summary: 'Registrar um novo filme' })
  @ApiResponse({
    status: 201,
    description: 'UsuáFilmeio registrado com sucesso',
    type: Movie,
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
    type: [Movie],
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
  async findAllMovies(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<{
    data: {
      _id: string;
      title: string;
      genres: string;
      released: string;
      imdb: object;
      runtime: number;
    }[];
    count: number;
  }> {
    return this.moviesService.findAll(page, perPage);
  }

  @ApiOperation({ summary: 'Listar um filme buscando pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado com sucesso',
    type: Movie,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Filme não encontrado',
  })
  @Get('/id/:id')
  findMovieById(@Param('id') id: string): Promise<Movie> {
    return this.moviesService.findById(id);
  }

  @ApiOperation({ summary: 'Atualizar um filme' })
  @ApiResponse({
    status: 200,
    description: 'Filme atualizado com sucesso',
    type: Movie,
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
    description: 'Filme deletado com sucesso',
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

  @ApiOperation({ summary: 'Obter a contagem total de filmes' })
  @ApiResponse({
    status: 200,
    description: 'Contagem de filmes obtida com sucesso',
    type: Number,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Get('count/allmovies')
  async getMoviesCount(): Promise<number> {
    return this.moviesService.getMoviesCount();
  }

  @Get('search')
  async search(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
    @Query('searchType') searchType: string,
    @Query('searchQuery') searchQuery: string,
  ): Promise<{
    data: {
      _id: string;
      title: string;
      genres: string;
      released: string;
    }[];
    count: number;
  }> {
    const searchResult = await this.moviesService.searchMovies(
      page,
      perPage,
      searchType,
      searchQuery,
    );
    console.log('CONTROLLER', searchResult, searchType, searchQuery);
    return searchResult;
  }

  @Get('searchId/:id')
  async searchById(@Param('id') id: string): Promise<{
    data: {
      _id: string;
      title: string;
      genres: string;
      released: string;
    }[];
    count: number;
  }> {
    const searchResult = await this.moviesService.searchById(id);
    console.log('CONTROLLER', searchResult, id);
    return searchResult;
  }
}
