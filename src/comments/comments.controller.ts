import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Query,
} from '@nestjs/common';
import { CommentService } from './comments.service';
import { Comment } from './schemas/comments.schema';
import { CreateCommentDto, UpdateCommentDto } from './dto/comments.dto';
import { JwtAuthGuard } from '../auth/utils/auth.guard';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ObjectId } from 'mongoose';

@UseGuards(JwtAuthGuard)
@Controller('comments')
@ApiBearerAuth()
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @ApiOperation({ summary: 'Registrar um novo comentário' })
  @ApiResponse({
    status: 201,
    description: 'Comentário registrado com sucesso',
    type: Comment,
  })
  @ApiResponse({
    status: 400,
    description: 'Bad Request - O comentário já existe',
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
  create(@Body() createCommentDto: CreateCommentDto): Promise<Comment> {
    return this.commentService.create(createCommentDto);
  }

  @ApiOperation({ summary: 'Listar todos os comnetários' })
  @ApiResponse({
    status: 200,
    description: 'Comentários retornados com sucesso',
    type: [Comment],
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
  async findAll(
    @Query('page') page = 1,
    @Query('perPage') perPage = 10,
  ): Promise<{
    data: {
      _id: string;
      date: string;
      email: string;
      movie_id: ObjectId;
      name: string;
      text: string;
    }[];
    count: number;
  }> {
    return this.commentService.findAll(page, perPage);
  }

  @ApiOperation({ summary: 'Listar comentários buscando pelo ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado com sucesso',
    type: [Comment],
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Comentários] não encontrado',
  })
  @Get('/id/:id')
  findCommentById(@Param('id') id: string): Promise<Comment> {
    return this.commentService.findCommentById(id);
  }

  @ApiOperation({ summary: 'Editar um comentário' })
  @ApiResponse({
    status: 200,
    description: 'Comentário editado com sucesso',
    type: Comment,
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
    description: 'Comentário não encontrado',
  })
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentService.update(id, updateCommentDto);
  }

  @ApiOperation({ summary: 'Deletar um comentário' })
  @ApiResponse({
    status: 200,
    description: 'Comentário deletado com sucesso',
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Comentário não encontrado',
  })
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Comment> {
    return this.commentService.remove(id);
  }

  @ApiOperation({ summary: 'Obter a contagem total de comentários' })
  @ApiResponse({
    status: 200,
    description: 'Contagem de comentários obtida com sucesso',
    type: Number,
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @Get('count/allcomments')
  async getCommentsCount(): Promise<number> {
    return this.commentService.getCommentsCount();
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
      name: string;
      email: string;
      movie_id: string;
      text: string;
      date: string;
    }[];
    count: number;
  }> {
    const searchResult = await this.commentService.searchComments(
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
      name: string;
      email: string;
      movie_id: string;
      text: string;
      date: string;
    }[];
    count: number;
  }> {
    const searchResult = await this.commentService.searchById(id);
    console.log('CONTROLLER', searchResult, id);
    return searchResult;
  }
}
