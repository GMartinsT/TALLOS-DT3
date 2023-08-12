import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theater, TheaterDocument } from './schemas/theaters.schema';
import { Model } from 'mongoose';

@Injectable()
export class TheatersService {
  constructor(
    @InjectModel(Theater.name) private theaterModel: Model<TheaterDocument>,
  ) {}

  async findAll(page = 1, perPage = 10): Promise<Theater[]> {
    const skip = (page - 1) * perPage;
    return this.theaterModel.find().skip(skip).limit(perPage).exec();
  }

  async findOne(id: string): Promise<Theater> {
    return this.theaterModel.findById(id).exec();
  }

  async create(theater: Theater): Promise<Theater> {
    const newTheater = new this.theaterModel(theater);
    return newTheater.save();
  }

  async update(id: string, theater: Theater): Promise<Theater> {
    return this.theaterModel
      .findByIdAndUpdate(id, theater, { new: true })
      .exec();
  }

  async remove(id: string): Promise<Theater> {
    return this.theaterModel.findByIdAndRemove(id).exec();
  }

  async getTheatersCount(): Promise<number> {
    return this.theaterModel.countDocuments().exec();
  }
}
