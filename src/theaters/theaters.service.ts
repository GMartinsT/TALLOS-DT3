import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theater, TheaterDocument } from './schemas/theaters.schema';
import { Model } from 'mongoose';

@Injectable()
export class TheatersService {
  constructor(
    @InjectModel(Theater.name) private theaterModel: Model<TheaterDocument>,
  ) {}

  async findAll(): Promise<Theater[]> {
    return this.theaterModel.find().exec();
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
}
