import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Manufacturer } from '../models';

export class CreateManufacturers implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const f = factory(Manufacturer)();
    await f.createMany(5);
  }
}
