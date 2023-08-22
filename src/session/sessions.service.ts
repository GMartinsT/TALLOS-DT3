import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId } from 'mongoose';
import { Session, SessionDocument } from './schemas/session.schema';

@Injectable()
export class SessionsService {
  constructor(
    @InjectModel(Session.name) private sessionModel: Model<SessionDocument>,
  ) {}

  async create(session: Session): Promise<Session> {
    const newSession = new this.sessionModel(session);
    return newSession.save();
  }

  async update(session: SessionDocument): Promise<SessionDocument> {
    return this.sessionModel
      .findByIdAndUpdate(session._id, session, { new: true })
      .exec();
  }

  async findAll(
    page = 1,
    perPage = 10,
  ): Promise<{ data: Session[]; count: number }> {
    const skip = (page - 1) * perPage;
    const data = await this.sessionModel
      .find()
      .skip(skip)
      .limit(perPage)
      .exec();
    const count = await this.getSessionCount();
    return {
      data,
      count,
    };
  }

  async findById(id: string): Promise<Session> {
    return this.sessionModel.findById(id).exec();
  }

  async findByUserId(user_id: ObjectId): Promise<SessionDocument> {
    return this.sessionModel.findOne({ user_id }).exec();
  }

  async findByJwt(jwt: string): Promise<Session> {
    return this.sessionModel.findOne({ jwt }).exec();
  }

  async removeByJwt(jwt: string): Promise<Session> {
    return this.sessionModel.findOneAndRemove({ jwt }).exec();
  }

  async getSessionCount(): Promise<number> {
    return this.sessionModel.countDocuments().exec();
  }

  async searchSessions(
    page = 1,
    perPage = 10,
    searchType: string,
    searchQuery: string,
  ): Promise<{ data: Session[]; count: number }> {
    const filter = {};
    filter['user_id'] = searchQuery;

    const skip = (page - 1) * perPage;
    const result = await this.sessionModel
      .find(filter)
      .skip(skip)
      .limit(perPage)
      .exec();
    const count = await this.getSessionCount();
    console.log('SERVICE', filter, searchQuery);
    return {
      data: result,
      count,
    };
  }
}
