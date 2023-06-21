import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import { Session, SessionDocument } from '../session/schemas/session.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcryptjs';
import { SessionsService } from 'src/session/sessions.service';


@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(Session.name) private readonly sessionModel: Model<SessionDocument>,
    private readonly sessionsService: SessionsService
  ) { }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    console.log('User:', user);
    console.log('Password:', password);

    if (user && await bcrypt.compare(password, user.password)) {
      return user;
    }
    return null;
  }

  async validateUserById(id: string): Promise<User | null> {
    const user = await this.usersService.findOne(id);
    if (user) {
      return user;
    }
    return null;
  }

  async generateAccessToken(user: User): Promise<string> {
    const payload = { name: user.name, email: user.email, _id: user._id }
    const token = await this.jwtService.signAsync(payload);
    return token;
  }

  async createOrUpdateSession(user: User, token: string): Promise<Session> {
    const existingSession = await this.sessionsService.findByUserId(user._id)

    if(existingSession) {
      existingSession.jwt = token;
      await this.sessionsService.update(existingSession);
      return existingSession
    } else {
      const session = await this.sessionsService.create({ user_id: user._id, jwt: token})
      return session
    }
  }
}
