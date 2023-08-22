import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findAll(
    page = 1,
    perPage = 10,
  ): Promise<{ data: User[]; count: number }> {
    const skip = (page - 1) * perPage;
    const data = await this.userModel.find().skip(skip).limit(perPage).exec();
    const count = await this.getUserCount();
    return {
      data,
      count,
    };
  }
  // async findAll(
  //   page = 1,
  //   perPage = 10,
  //   searchQuery = '',
  // ): Promise<{ data: User[]; count: number }> {
  //   const skip = (page - 1) * perPage;
  //   const filterColumns = ['name', 'email'].map((column) => ({
  //     [column]: searchQuery,
  //   }));
  //   const data = await this.userModel
  //     .find({ $or: [filterColumns] })
  //     .skip(skip)
  //     .limit(perPage)
  //     .exec();
  //   const count = await this.getUserCount();
  //   return {
  //     data,
  //     count,
  //   };
  // }

  async searchUsers(
    page = 1,
    perPage = 10,
    searchType: string,
    searchQuery: string,
  ): Promise<{ data: User[]; count: number }> {
    const filter = {};

    if (searchType === 'name') {
      filter['name'] = { $regex: searchQuery, $options: 'i' };
    } else if (searchType === 'email') {
      filter['email'] = { $regex: searchQuery, $options: 'i' };
    }

    const skip = (page - 1) * perPage;
    const result = await this.userModel
      .find(filter)
      .skip(skip)
      .limit(perPage)
      .exec();
    const count = await this.getUserCount();
    console.log('SERVICE', filter, searchQuery);
    return {
      data: result,
      count,
    };
  }

  async findByEmail(email: string) {
    console.log(email);
    return await this.userModel.findOne({ email }).exec();
  }

  async findById(id: string): Promise<User> {
    return await this.userModel.findById(id, { password: 0 }).exec();
  }

  async create(user: CreateUserDto): Promise<User> {
    user.password = await bcrypt.hash(user.password, 10);
    const newUser = new this.userModel(user);
    return await newUser.save();
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    if (updateUserDto.password) {
      updateUserDto.password = await bcrypt.hash(updateUserDto.password, 10);
    }

    return this.userModel
      .findByIdAndUpdate(id, updateUserDto, { new: true })
      .exec();
  }

  async remove(id: string): Promise<User> {
    return this.userModel.findByIdAndRemove(id).exec();
  }

  async getUserCount(): Promise<number> {
    return this.userModel.countDocuments().exec();
  }
}
