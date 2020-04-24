import * as faker from 'faker';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Manufacturer, Car, Owner } from '../models';

export class CreateCarsAndOwners implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const ownerFactory = factory(Owner)();
    const carFactory = factory(Car)();

    const manufacturersGenerator = await (async () => {
      const manufacturers = await factory(Manufacturer)().createMany(5);

      function* generator(): IterableIterator<Manufacturer> {
        let idx = manufacturers.length;
        while (true) {
          if (manufacturers.length === idx)
            idx = 0;
          yield manufacturers[idx];
          ++idx;
        }
      }

      return generator();
    })();


    const cars = await carFactory.createMany(50, { manufacturer: manufacturersGenerator.next().value });
    cars.forEach(car => car.manufacturer = manufacturersGenerator.next().value);
    const em = connection.createEntityManager();

    await em.save(cars);

    const owners = await ownerFactory.createMany(10);
    owners.forEach(o => {
      const idx = faker.random.number({ min: 1, max: 7 });

      o.cars = cars.splice(0, idx);
    });

    await em.save(owners);

    await ownerFactory.create({ cars });
  }
}
