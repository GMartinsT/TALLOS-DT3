import { ApiProperty } from '@nestjs/swagger';

export class CreateCommentDto {
  @ApiProperty({ example: 'Name Lastname', description: 'Nome do autor do comentário' })
  name: string;

  @ApiProperty({ example: 'exemple@mail.com', description: 'E-mail do autor do comentário' })
  email: string;

  @ApiProperty({ example: '60a9a9ad1b61b41ac0eaa47a', description: 'ID do filme relacionado ao comentário' })
  movie_id: string;

  @ApiProperty({ example: 'Excelente filme!', description: 'Texto do comentário' })
  text: string;

  @ApiProperty({ example: '2023-05-30T12:00:00Z', description: 'Data do comentário' })
  date: Date;
}

export class UpdateCommentDto {
  @ApiProperty({ example: 'John Doe', description: 'Novo nome do autor do comentário' })
  name?: string;

  @ApiProperty({ example: 'johndoe@example.com', description: 'Novo e-mail do autor do comentário' })
  email?: string;

  @ApiProperty({ example: '60a9a9ad1b61b41ac0eaa47a', description: 'Novo ID do filme relacionado ao comentário' })
  movie_id?: string;

  @ApiProperty({ example: 'Excelente filme!', description: 'Novo texto do comentário' })
  text?: string;

  @ApiProperty({ example: '2023-05-30T12:00:00Z', description: 'Nova data do comentário' })
  date?: Date;
}
