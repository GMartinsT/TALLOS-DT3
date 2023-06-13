import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { CommentsModule } from './comments/comments.module';
import { TheatersModule } from './theaters/theaters.module';
import { SessionsModule } from './session/sessions.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://guilhermemartins:h3aZ83NYzy7ZQNGq@somngd01.cloud.dns.internal,somngd02.cloud.dns.internal,somngd03.cloud.dns.internal/?authMechanism=DEFAULT&authSource=admin&replicaSet=rs0&readPreference=secondaryPreferred'),
    UsersModule,
    MoviesModule,
    CommentsModule,
    TheatersModule,
    SessionsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
