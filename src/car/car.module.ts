import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CarController } from './car.controller';
import { CarService } from './car.service';
import { Car, CarToOwner } from '../db/models';

@Module({
  imports: [TypeOrmModule.forFeature([Car, CarToOwner])],
  controllers: [CarController],
  providers: [CarService],
  exports: [CarService],
})
export class CarModule { }
