import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TheatersController } from './theaters.controller';
import { TheatersService } from './theaters.service';
import { Theater, TheaterSchema } from './schemas/theaters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Theater.name, schema: TheaterSchema }]),
  ],
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
