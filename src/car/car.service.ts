import * as dayjs from 'dayjs';
import { Injectable } from '@nestjs/common';
import { Repository, Between, LessThan } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Car, CarToOwner } from '../db/models';


@Injectable()
export class CarService extends TypeOrmCrudService<Car> {
  constructor(
    @InjectRepository(Car)
    repo: Repository<Car>,
    @InjectRepository(CarToOwner)
    private readonly carToOwnerRepo: Repository<CarToOwner>,
  ) {
    super(repo);
  }

  decidePagination() {
    return false;
  }

  async getManufacturer(carId: string) {
    const car = await this.repo.findOneOrFail(carId, { relations: ['manufacturer'] });
    return car.manufacturer;
  }

  // ["2019-04-25T13:14:33.514Z","2018-10-25T13:14:33.516Z"]
  performAging() {
    const dt12mon = dayjs().subtract(12, 'month').toISOString();
    const dt18mon = dayjs().subtract(18, 'month').toISOString();

    return Promise.all([
      this.carToOwnerRepo.delete({ purchaseDate: LessThan(dt18mon) }),
      this.repo.update(
        { firstRegistrationDate: Between(dt12mon, dt18mon) },
        { price: () => 'price * 0.8' }
      )
    ]);
  }

}
