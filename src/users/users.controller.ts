import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { JwtAuthGuard } from '../auth/utils/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './schemas/user.schema';

@UseGuards(JwtAuthGuard)
@Controller('users')
@ApiBearerAuth()
@ApiTags('Users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }
    
    @ApiOperation({ summary: 'Listar todos os usuários' })
    @ApiResponse({
        status: 200,
        description: 'Usuários retornados com sucesso',
        type: [User]
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
    findAll() {
        return this.usersService.findAll();
    }

    @ApiOperation({ summary: 'Listar usuário buscando pelo ID' })
    @ApiResponse({
        status: 200,
        description: 'Usuário retornado com sucesso',
        type: User
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    @Get(':id')
    findOne(@Param('id') id: string) {
        return this.usersService.findOne(id);
    }

    @ApiOperation({ summary: 'Registrar um novo usuário' })
    @ApiResponse({
        status: 201,
        description: 'Usuário registrado com sucesso',
        type: User
    })
    @ApiResponse({
        status: 400,
        description: 'Bad Request - O usuário já existe',
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
    create(@Body() createUserDto: CreateUserDto) {
        return this.usersService.create(createUserDto);
    }

    @ApiOperation({ summary: 'Atualizar um usuário' })
    @ApiResponse({
        status: 200,
        description: 'Usuário atualizado com sucesso',
        type: User
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
    update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
        return this.usersService.update(id, updateUserDto);
    }

    @ApiOperation({ summary: 'Deletar um usuário' })
    @ApiResponse({
        status: 200,
        description: 'Usuário deletado com sucesso'
    })
    @ApiResponse({
        status: 401,
        description: 'Não autorizado',
    })
    @ApiResponse({
        status: 404,
        description: 'Usuário não encontrado',
    })
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.usersService.remove(id);
    }
}
