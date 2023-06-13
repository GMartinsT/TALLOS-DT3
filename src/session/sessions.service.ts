import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
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

  async findByUserId(user_id: string): Promise<Session[]> {
    return this.sessionModel.find({ user_id }).exec();
  }

  async findByJwt(jwt: string): Promise<Session> {
    return this.sessionModel.findOne({ jwt }).exec();
  }

  async removeByJwt(jwt: string): Promise<Session> {
    return this.sessionModel.findOneAndRemove({ jwt }).exec();
  }
}
