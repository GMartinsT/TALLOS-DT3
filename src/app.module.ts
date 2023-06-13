import { MoviesModule } from './movies/movies.module';
import { UsersModule } from './users/users.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'
import { UserSchema } from './users/schemas/user.schema';

@Module({
  imports: [
    MoviesModule,
    UsersModule,
    MongooseModule.forRoot('mongodb://guilhermemartins:h3aZ83NYzy7ZQNGq@somngd01.cloud.dns.internal,somngd02.cloud.dns.internal,somngd03.cloud.dns.internal/?authMechanism=DEFAULT&authSource=admin&replicaSet=rs0&readPreference=secondaryPreferred'),
    MongooseModule.forFeature([{ name: UsersModule.name, schema: UserSchema }]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
