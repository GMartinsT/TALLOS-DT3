import { ApiProperty } from "@nestjs/swagger";

export class CreateUserDto {
  @ApiProperty({ example: 'Name Lastname', description: 'Nome do usuário' })
  name: string;

  @ApiProperty({ example: 'exemple@mail.com', description: 'E-mail do usuário' })
  email: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuário' })
  password: string;
}

export class UpdateUserDto {
  @ApiProperty({ example: 'Name Lastname', description: 'Nome do usuário' })
  name?: string;

  @ApiProperty({ example: 'exemple@mail.com', description: 'E-mail do usuário' })
  email?: string;

  @ApiProperty({ example: 'password123', description: 'Senha do usuário' })
  password?: string;
}
