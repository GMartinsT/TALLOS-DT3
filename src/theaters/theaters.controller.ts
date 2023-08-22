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
import { TheatersService } from './theaters.service';
import { Theater } from './schemas/theaters.schema';
import { JwtAuthGuard } from '../auth/utils/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('theaters')
@ApiBearerAuth()
@ApiTags('Theaters')
export class TheatersController {
  constructor(private theatersService: TheatersService) {}
  @ApiOperation({ summary: 'Listar todos os cinemas' })
  @ApiResponse({
    status: 200,
    description: 'Cinemas retornados com sucesso',
    type: [Theater],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Cinemas não encontrados',
  })
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<{
    data: {
      _id: string;
      theaterId: number;
      location: string;
    }[];
    count: number;
  }> {
    return this.theatersService.findAll(page, perPage);
  }

  @ApiOperation({ summary: 'Listar um cinenema buscando pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Cinema retornado com sucesso',
    type: [Theater],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Cinema não encontrados',
  })
  @Get('/id/:id')
  async findOne(@Param('id') id: string): Promise<Theater> {
    return this.theatersService.findOne(id);
  }

  @ApiOperation({ summary: 'Registrar um novo cinema' })
  @ApiResponse({
    status: 201,
    description: 'cinema registrado com sucesso',
    type: Theater,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - O cinema já está registrado',
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
  async create(@Body() theater: Theater): Promise<Theater> {
    return this.theatersService.create(theater);
  }

  @ApiOperation({ summary: 'Atualizar um cinema' })
  @ApiResponse({
    status: 200,
    description: 'Cinema atualizado com sucesso',
    type: Theater,
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
    description: 'Usuário não encontrado',
  })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() theater: Theater,
  ): Promise<Theater> {
    return this.theatersService.update(id, theater);
  }

  @ApiOperation({ summary: 'Deletar um cinema' })
  @ApiResponse({
    status: 200,
    description: 'Cinema deletado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Cinema não encontrado',
  })
  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Theater> {
    return this.theatersService.remove(id);
  }

  @ApiOperation({ summary: 'Obter a contagem total de cinemas' })
  @ApiResponse({
    status: 200,
    description: 'Contagem de cinemas obtida com sucesso',
    type: Number,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Get('count/alltheaters')
  async getTheatersCount(): Promise<number> {
    return this.theatersService.getTheatersCount();
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
      theaterId: number;
      location: string;
    }[];
    count: number;
  }> {
    const searchResult = await this.theatersService.searchTheaters(
      page,
      perPage,
      searchType,
      searchQuery,
    );
    console.log('CONTROLLER', searchResult, searchType, searchQuery);
    return searchResult;
  }

  @Get('/searchId/:id')
  async searchById(@Param('id') id: string): Promise<{
    data: {
      _id: string;
      theaterId: number;
      location: string;
    }[];
    count: number;
  }> {
    const searchResult = await this.theatersService.searchById(id);
    console.log('CONTROLLER', searchResult);
    return searchResult;
  }
}
