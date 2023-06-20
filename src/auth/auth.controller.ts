import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './utils/login.dto';
import { ApiTags } from '@nestjs/swagger';

@Controller('login')
@ApiTags('Login')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(@Body() loginDto: LoginDto) {
    const { email, password } = loginDto;

    const user = await this.authService.validateUser(email, password);
    if (!user) {
      throw new UnauthorizedException('Login inválido');
    }

    const accessToken = await this.authService.generateAccessToken(user);
    const session = await this.authService.createOrUpdateSession(user, accessToken)

    return { access_token: accessToken, session: session };
  }
}
