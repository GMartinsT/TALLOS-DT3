import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Comment, CommentDocument } from './schemas/comments.schema';
import { CreateCommentDto, UpdateCommentDto } from './dto/comments.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel(Comment.name) private commentModel: Model<CommentDocument>,
  ) {}

  async create(createCommentDto: CreateCommentDto): Promise<Comment> {
    const createdComment = new this.commentModel(createCommentDto);
    return createdComment.save();
  }

  async findAll(
    page = 1,
    perPage = 10,
  ): Promise<{
    data: {
      _id: string;
      date: string;
      email: string;
      movie_id: ObjectId;
      name: string;
      text: string;
    }[];
    count: number;
  }> {
    const skip = (page - 1) * perPage;
    const data = await this.commentModel
      .find()
      .skip(skip)
      .limit(perPage)
      .exec();

    const formattedData = data.map((comment) => ({
      _id: comment._id,
      date: this.formatDate(comment.date),
      email: comment.email,
      movie_id: comment.movie_id,
      name: comment.name,
      text: comment.text,
    }));

    const count = await this.getCommentsCount();
    return {
      data: formattedData,
      count,
    };
  }

  formatDate(date: Date): string {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  }

  async findOne(id: string): Promise<Comment> {
    return this.commentModel.findById(id).exec();
  }

  async update(
    id: string,
    updateCommentDto: UpdateCommentDto,
  ): Promise<Comment> {
    return this.commentModel
      .findByIdAndUpdate(id, updateCommentDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Comment> {
    return this.commentModel.findByIdAndRemove(id).exec();
  }

  async getCommentsCount(): Promise<number> {
    return this.commentModel.countDocuments().exec();
  }
}
