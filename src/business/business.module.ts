import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Manufacturer, Owner, CarToOwner } from '../db/models';
import { CarModule } from '../car/car.module';

import { BusinessController } from './business.controller';
import { BusinessService } from './business.service';

@Module({
  imports: [CarModule, TypeOrmModule.forFeature([Manufacturer, Owner, CarToOwner])],
  controllers: [BusinessController],
  providers: [BusinessService],
})
export class BusinessModule { }
