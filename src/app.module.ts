import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { CommentsModule } from './comments/comments.module';
import { TheatersModule } from './theaters/theaters.module';
import { SessionsModule } from './session/sessions.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.MONGODB_URL),
    UsersModule,
    MoviesModule,
    CommentsModule,
    TheatersModule,
    SessionsModule,
    AuthModule,
    JwtModule.register({
      secret: 'secretkey',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
