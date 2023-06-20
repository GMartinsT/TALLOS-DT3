import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { SessionsModule } from 'src/session/sessions.module';
import { JwtStrategy } from './utils/jwt.strategy';
import { Session, SessionSchema } from 'src/session/schemas/session.schema';
import { jwtConstants } from './utils/auth.constants';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '24h' },
    }),
    UsersModule,
    SessionsModule,
    MongooseModule.forFeature([{ name: Session.name, schema: SessionSchema }]),
  ],
  controllers: [
    AuthController
],
  providers: [
    AuthService,
    JwtStrategy,
    { provide: Session.name, useFactory: () => SessionSchema }
],
  exports: [AuthService]
})
export class AuthModule {}
