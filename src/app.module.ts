import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose'

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://guilhermemartins:h3aZ83NYzy7ZQNGq@somngd01.cloud.dns.internal,somngd02.cloud.dns.internal,somngd03.cloud.dns.internal/?authMechanism=DEFAULT&authSource=admin&replicaSet=rs0&readPreference=secondaryPreferred')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
