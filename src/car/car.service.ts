import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';

import { Car } from '../db/models';

@Injectable()
export class CarService extends TypeOrmCrudService<Car> {
  constructor(@InjectRepository(Car) repo: Repository<Car>) {
    super(repo);
  }

  decidePagination() {
    return false;
  }
}
