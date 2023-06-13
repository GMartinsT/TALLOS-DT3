export class CreateCommentDto {
    name: string;
    email: string;
    movie_id: string;
    text: string;
    date: Date;
  }
  
  export class UpdateCommentDto {
    name?: string;
    email?: string;
    movie_id?: string;
    text?: string;
    date?: Date;
  }
  