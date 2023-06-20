import { Controller, Get, Post, Put, Delete, Param, Body, UseGuards } from '@nestjs/common';
import { TheatersService } from './theaters.service';
import { Theater } from './schemas/theaters.schema';
import { JwtAuthGuard } from 'src/auth/utils/auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@UseGuards(JwtAuthGuard)
@Controller('theaters')
@ApiBearerAuth()
@ApiTags('Theaters')
export class TheatersController {
  constructor(private theatersService: TheatersService) {}

  @Get()
  async findAll(): Promise<Theater[]> {
    return this.theatersService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Theater> {
    return this.theatersService.findOne(id);
  }

  @Post()
  async create(@Body() theater: Theater): Promise<Theater> {
    return this.theatersService.create(theater);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() theater: Theater): Promise<Theater> {
    return this.theatersService.update(id, theater);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<Theater> {
    return this.theatersService.remove(id);
  }
}
