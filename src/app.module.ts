import { Module } from '@nestjs/common';
import { ConfigModule } from './config/config.module';
import { CarModule } from './car/car.module';

@Module({
  imports: [ConfigModule, CarModule],
})
export class AppModule {}
