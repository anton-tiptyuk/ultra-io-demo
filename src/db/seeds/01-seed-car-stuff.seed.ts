import * as faker from 'faker';
import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

import { Manufacturer, Car, Owner, CarToOwner } from '../models';

const MANUFACTURERS_NUMBER = 7;
const CAR_NUMBER = 40;
const MAX_CAR_OWNERS = 5;

export class CreateCarsAndOwners implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    const manufacturersGenerator = await (async () => {
      const manufacturers = await factory(Manufacturer)().createMany(MANUFACTURERS_NUMBER);

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

    const carFactory = factory(Car)()
      .map(async car => {
        car.manufacturer = manufacturersGenerator.next().value;
        return car;
      });
    const ownerFactory = factory(Owner)();

    const em = connection.createEntityManager();

    const cars = await carFactory.createMany(CAR_NUMBER);

    const carOwners: CarToOwner[] = [];

    await Promise.all(cars.map(async car => {
      const owners = await ownerFactory.createMany(faker.random.number({ min: 1, max: MAX_CAR_OWNERS }));
      carOwners.push(...owners.map(owner => {
        const car2owner = new CarToOwner();
        car2owner.car = car;
        car2owner.owner = owner;
        car2owner.purchaseDate = faker.date.past(3);
        return car2owner;
      }));
    }));

    await em.save(carOwners);
  }
}
