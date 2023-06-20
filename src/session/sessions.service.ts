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
    return this.sessionModel.findByIdAndUpdate(session._id, session, { new: true }).exec();
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
}
