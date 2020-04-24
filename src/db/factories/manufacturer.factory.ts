import * as Faker from 'faker';
import { define } from 'typeorm-seeding';

import { Manufacturer } from '../models';

define(Manufacturer, (faker: typeof Faker) => {
  const manufacturer = new Manufacturer();
  manufacturer.id = faker.random.uuid();
  manufacturer.name = faker.company.companyName();
  manufacturer.phone = faker.phone.phoneNumber();
  manufacturer.siret = faker.random.alphaNumeric(14);

  return manufacturer;
});
