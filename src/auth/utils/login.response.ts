import { ApiProperty } from '@nestjs/swagger';
import { Session } from '../../session/schemas/session.schema';

export class LoginResponse {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVpeiBGZXJuYW5kbyIsImVtYWlsIjoibGZAbWFpbC5jb20iLCJfaWQiOiI2NDhlMWNkNjJjNzBlYjdiNmMwOTE4YTYiLCJpYXQiOjE2ODcxODUxMzgsImV4cCI6MTY4NzI3MTUzOH0.et1LBIRaarGgQqXdly_uyUVu_2XNNhp6Z37ezVNncM0',
    description: 'Token JWT do usuário logado',
  })
  access_token: string;

  @ApiProperty({
    example: {
      user_id: '615d894972454f001f74c236',
      jwt: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVpeiBGZXJuYW5kbyIsImVtYWlsIjoibGZAbWFpbC5jb20iLCJfaWQiOiI2NDhlMWNkNjJjNzBlYjdiNmMwOTE4YTYiLCJpYXQiOjE2ODcxODUxMzgsImV4cCI6MTY4NzI3MTUzOH0.et1LBIRaarGgQqXdly_uyUVu_2XNNhp6Z37ezVNncM0',
    },
    description: 'Informações da sessão do usuário logado',
  })
  session: Session;
}
