import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Owner } from '../db/models';
import { CarService } from '../car/car.service';

@Injectable()
export class BusinessService {
  constructor(
    private readonly carService: CarService,
    @InjectRepository(Owner)
    private readonly ownerRepo: Repository<Owner>
  ) { }

  // First we call carService
  // It applies the car price with discount
  // and drops CarToOwner join table entitites with purchaseDate matching range

  // Then we get back here and drop orphan owners
  // (because even though we seed data in a way owner posesses only one car,
  // the data structure and common logic says it is possible that owner had owned several cars
  // in the past)
  async performAging() {
    const results: { affected?: number | null }[] = await this.carService.performAging();

    results.push(
      await this
        .ownerRepo
        .createQueryBuilder()
        .delete()
        .where('not exists (select 1 from car_to_owner where car_to_owner.owner_id = owner.id)')
        .execute()
    );

    return results.map(({ affected }) => affected);
  }

}
