import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { CommentService } from './comments.service';
import { Comment } from './schemas/comments.schema';
import { CreateCommentDto, UpdateCommentDto } from './dto/comments.dto';
import { JwtAuthGuard } from '../auth/utils/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('comments')
@ApiBearerAuth()
@ApiTags('Comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) { }

  @ApiOperation({ summary: 'Registrar um novo comentário' })
  @ApiResponse({
    status: 201,
    description: 'Comentário registrado com sucesso',
    type: Comment
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
    type: [Comment]
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
  findAll(): Promise<Comment[]> {
    return this.commentService.findAll();
  }

  @ApiOperation({ summary: 'Listar comentários buscando pelo ID do usuário' })
  @ApiResponse({
    status: 200,
    description: 'Usuário retornado com sucesso',
    type: [Comment]
  })
  @ApiResponse({
    status: 401,
    description: 'Não autorizado',
  })
  @ApiResponse({
    status: 404,
    description: 'Comentários] não encontrado',
  })
  @Get(':id')
  findOne(@Param('id') user_id: string): Promise<Comment> {
    return this.commentService.findOne(user_id);
  }

  @ApiOperation({ summary: 'Editar um comentário' })
  @ApiResponse({
    status: 200,
    description: 'Comentário editado com sucesso',
    type: Comment
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
    description: 'Comentário deletado com sucesso'
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
}
