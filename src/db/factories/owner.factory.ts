import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Owner } from '../models';

define(Owner, (faker: typeof Faker) => {
  const owner = new Owner();
  owner.id = faker.random.uuid();
  owner.name = faker.internet.userName();
  return owner;
});
