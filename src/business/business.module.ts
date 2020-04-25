import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Owner } from '../db/models';
import { CarModule } from '../car/car.module';

import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
  imports: [CarModule, TypeOrmModule.forFeature([Owner])],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule { }
