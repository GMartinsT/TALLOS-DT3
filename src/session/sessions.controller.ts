import {
  Controller,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Get,
  Query,
} from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session } from './schemas/session.schema';
import { JwtAuthGuard } from '../auth/utils/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('sessions')
@ApiBearerAuth()
@ApiTags('Sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @ApiOperation({ summary: 'Registrar uma nova sessção' })
  @ApiResponse({
    status: 201,
    description: 'Sessão registrado com sucesso',
    type: Session,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - O Sessão já existe',
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
  async create(@Body() session: Session): Promise<Session> {
    return this.sessionsService.create(session);
  }

  @ApiOperation({ summary: 'Deletar uma sessão' })
  @ApiResponse({
    status: 200,
    description: 'Sessão deletada com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Sessão não encontrada',
  })
  @Delete(':jwt')
  async removeByJwt(@Param('jwt') jwt: string): Promise<Session> {
    return this.sessionsService.removeByJwt(jwt);
  }

  @ApiOperation({ summary: 'Listar todas as sessões' })
  @ApiResponse({
    status: 200,
    description: 'Sessoões retornadas com sucesso',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Sessões não encontradas',
  })
  @Get()
  async findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<{ data: Session[]; count: number }> {
    return this.sessionsService.findAll(page, perPage);
  }

  @ApiOperation({ summary: 'Listar sessões buscando pelo ID' })
  @ApiResponse({
    status: 200,
    description: 'Sessão retornada com sucesso',
    type: [Session],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Sessão não encontrado',
  })
  @Get(':id')
  findOne(@Param('id') user_id: string): Promise<Session> {
    return this.sessionsService.findOne(user_id);
  }
}
