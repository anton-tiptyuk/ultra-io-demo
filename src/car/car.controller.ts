import { Controller } from '@nestjs/common';
import {
  Crud, CrudController,
} from '@nestjsx/crud';

import { Car } from '../db/models';
import { CarService } from './car.service';

@Crud({
  model: { type: Car },
  query: {
    join: {
      manufacturer: { eager: true },
    },
  },
})
@Controller('car')
export class CarController implements CrudController<Car> {
  constructor(public service: CarService) { }
}
