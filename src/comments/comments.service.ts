import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findAll(page = 1, perPage = 10): Promise<Comment[]> {
    const skip = (page - 1) * perPage;
    return this.commentModel.find().skip(skip).limit(perPage).exec();
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
