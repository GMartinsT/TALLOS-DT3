import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Theater, TheaterDocument } from './schemas/theaters.schema';
import { Model } from 'mongoose';

@Injectable()
export class TheatersService {
  constructor(
    @InjectModel(Theater.name) private theaterModel: Model<TheaterDocument>,
  ) {}

  async findAll(
    page = 1,
    perPage = 10,
  ): Promise<{
    data: {
      _id: string;
      theaterId: number;
      location: string;
    }[];
    count: number;
  }> {
    const skip = (page - 1) * perPage;
    const data = await this.theaterModel
      .find()
      .skip(skip)
      .limit(perPage)
      .exec();

    const formattedData = data.map((theater) => ({
      _id: theater._id,
      theaterId: theater.theaterId,
      location: this.formatLoc(theater.location),
    }));

    const count = await this.getTheatersCount();
    return {
      data: formattedData,
      count,
    };
  }

  formatLoc(location): string {
    const { city, state } = location.address;
    return `${city}/${state}`;
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

  async searchTheaters(
    page = 1,
    perPage = 10,
    searchType: string,
    searchQuery: string | number,
  ): Promise<{
    data: {
      _id: string;
      theaterId: number;
      location: string;
    }[];
    count: number;
  }> {
    const filter = {};

    if (searchType === 'theaterId') {
      filter['theaterId'] = searchQuery;
    } else if (searchType === 'location') {
      filter['location.address.city'] = { $regex: searchQuery, $options: 'i' };
    }

    const skip = (page - 1) * perPage;
    const result = await this.theaterModel
      .find(filter)
      .skip(skip)
      .limit(perPage)
      .exec();

    const formattedData = result.map((theater) => ({
      _id: theater._id,
      theaterId: theater.theaterId,
      location: this.formatLoc(theater.location),
    }));

    const count = await this.getTheatersCount();

    return {
      data: formattedData,
      count,
    };
  }

  async searchById(id: string): Promise<{
    data: {
      _id: string;
      theaterId: number;
      location: string;
    }[];
    count: number;
  }> {
    const result = await this.theaterModel.findById(id).exec();
    console.log('SERVICE1', result);

    const formattedData = [result].map((theater) => ({
      _id: theater._id,
      theaterId: theater.theaterId,
      location: this.formatLoc(theater.location),
    }));
    console.log('SERVICE2', result, formattedData);
    const count = await this.getTheatersCount();
    console.log('SERVICE3', result, formattedData);
    return {
      data: formattedData,
      count,
    };
  }
}
