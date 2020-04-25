import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CarModule } from './car/car.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [ConfigModule, CarModule, BusinessModule],
})
export class AppModule {}
