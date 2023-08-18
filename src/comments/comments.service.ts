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

  async findCommentById(id: string): Promise<Comment> {
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

  async searchComments(
    page = 1,
    perPage = 10,
    searchType: string,
    searchQuery: string,
  ): Promise<{
    data: {
      _id: string;
      name: string;
      email: string;
      movie_id: string;
      text: string;
      date: string;
    }[];
    count: number;
  }> {
    const filter = {};

    if (searchType === 'name') {
      filter['name'] = { $regex: searchQuery, $options: 'i' };
    } else if (searchType === 'email') {
      filter['email'] = { $regex: searchQuery, $options: 'i' };
    } else if (searchType === 'movie_id') {
      filter['movie_id'] = searchQuery;
    } else if (searchType === 'date') {
      const [day, month, year] = searchQuery.split('/');
      const isoFormattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
      const startDate = new Date(
        Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day)),
      );
      const endDate = new Date(
        Date.UTC(parseInt(year), parseInt(month) - 1, parseInt(day) + 1),
      );
      filter['date'] = { $gte: startDate, $lt: endDate };
      console.log('DATEEEE', isoFormattedDate, filter);
    }
    const skip = (page - 1) * perPage;
    const result = await this.commentModel
      .find(filter, {
        _id: 1,
        name: 1,
        email: 1,
        movie_id: 1,
        text: 1,
        date: 1,
      })
      .skip(skip)
      .limit(perPage)
      .exec();
    console.log('RESULT', result);
    const count = await this.getCommentsCount();
    const formattedData = result.map((comment) => ({
      _id: comment._id,
      name: comment.name,
      email: comment.email,
      movie_id: comment.movie_id.toString(),
      text: comment.text,
      date: this.formatDate(comment.date),
    }));
    console.log('DATA FORMATADA', formattedData);
    console.log('SERVICE', filter, searchQuery);
    return {
      data: formattedData,
      count,
    };
  }

  async searchById(searchQuery: string): Promise<{
    data: {
      _id: string;
      name: string;
      email: string;
      movie_id: string;
      text: string;
      date: string;
    }[];
    count: number;
  }> {
    const data = [
      await this.commentModel
        .findById(searchQuery, {
          _id: 1,
          name: 1,
          email: 1,
          movie_id: 1,
          text: 1,
          date: 1,
        })
        .exec(),
    ];

    const formattedData = data.map((comment) => ({
      _id: comment._id,
      name: comment.name,
      email: comment.email,
      movie_id: comment.movie_id.toString(),
      text: comment.text,
      date: this.formatDate(comment.date),
    }));

    const count = await this.getCommentsCount();
    return {
      data: formattedData,
      count,
    };
  }
}
