import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TheatersController } from './theaters.controller';
import { TheatersService } from './theaters.service';
import { TheaterSchema } from './schemas/theaters.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Theater', schema: TheaterSchema }]),
  ],
  controllers: [TheatersController],
  providers: [TheatersService],
})
export class TheatersModule {}
