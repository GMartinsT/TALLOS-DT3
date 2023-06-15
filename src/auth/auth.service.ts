import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/schemas/user.schema';
import { Session, SessionDocument } from '../session/schemas/session.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
    @InjectModel(Session.name) private readonly sessionModel: Model<SessionDocument>,
  ) {}

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.usersService.findByEmail(email);
    console.log('User:', user);
    console.log('Password:', password);

    if (user && await user.password === password) {
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
    const payload = { email: user.email, name: user.name, _id: user._id };
    const token = await this.jwtService.signAsync(payload);

    const session = new this.sessionModel({ user_id: user._id, jwt: token });
    await session.save();

    return token;
  }
}
