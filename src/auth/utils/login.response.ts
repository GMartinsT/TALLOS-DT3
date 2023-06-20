import { ApiProperty } from "@nestjs/swagger";

export class LoginResponse {
    @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVpeiBGZXJuYW5kbyIsImVtYWlsIjoibGZAbWFpbC5jb20iLCJfaWQiOiI2NDhlMWNkNjJjNzBlYjdiNmMwOTE4YTYiLCJpYXQiOjE2ODcxODUxMzgsImV4cCI6MTY4NzI3MTUzOH0.et1LBIRaarGgQqXdly_uyUVu_2XNNhp6Z37ezVNncM0', description: 'Token JWT do usuário logado' })
    access_token: string
}