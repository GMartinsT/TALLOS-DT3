import { Module } from '@nestjs/common';
import { CommentController } from './comments.controller';
import { CommentService } from './comments.service';
import { CommentSchema } from './schemas/comments.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Comment', schema: CommentSchema }]),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentsModule {}
