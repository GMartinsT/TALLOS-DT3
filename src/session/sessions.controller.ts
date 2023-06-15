import { Controller, Post, Body, Delete, Param, UseGuards } from '@nestjs/common';
import { SessionsService } from './sessions.service';
import { Session } from './schemas/session.schema';
import { JwtAuthGuard } from 'src/auth/utils/auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('sessions')
export class SessionsController {
  constructor(private sessionsService: SessionsService) {}

  @Post()
  async create(@Body() session: Session): Promise<Session> {
    return this.sessionsService.create(session);
  }

  @Delete(':jwt')
  async removeByJwt(@Param('jwt') jwt: string): Promise<Session> {
    return this.sessionsService.removeByJwt(jwt);
  }
}
