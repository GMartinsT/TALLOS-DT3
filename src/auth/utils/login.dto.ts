import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
  @ApiProperty({ example: 'exemple@mail.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuário' })
  password: string;
}