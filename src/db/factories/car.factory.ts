import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Car } from '../models';

define(Car, (faker: typeof Faker) => {
  const car = new Car();
  car.id = faker.random.uuid();
  car.price = parseFloat(faker.finance.amount(300000, 500000, 0));
  car.firstRegistrationDate = faker.date.past();
  return car;
});
