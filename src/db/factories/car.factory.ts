import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Car } from '../models';

define(Car, (faker: typeof Faker) => {
  const car = new Car();
  car.id = faker.random.uuid();
  car.price = 1000 * parseFloat(faker.finance.amount(30, 500, 0));
  car.firstRegistrationDate = faker.date.past(3);
  return car;
});
