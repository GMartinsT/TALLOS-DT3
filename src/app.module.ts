import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { CommentsModule } from './comments/comments.module';
import { TheatersModule } from './theaters/theaters.module';
import { SessionsModule } from './session/sessions.module';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://guilhermemartins:h3aZ83NYzy7ZQNGq@somngd01.cloud.dns.internal,somngd02.cloud.dns.internal,somngd03.cloud.dns.internal/guilhermemartins?authMechanism=DEFAULT&authSource=admin&replicaSet=rs0&readPreference=secondaryPreferred'),
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
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
