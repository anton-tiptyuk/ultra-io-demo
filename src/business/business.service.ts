import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { CarService } from '../car/car.service';

@Injectable()
export class BusinessService {
  constructor(
    private readonly carService: CarService
    // @InjectRepository(Car) repo: Repository<Car>
  ) { }

  async performAging() {
    return this.carService.performAging();
    // throw new Error("Method not implemented.");
  }

}
