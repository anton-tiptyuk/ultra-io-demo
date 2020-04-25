import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm/connection/Connection';

export class ClearTables implements Seeder {
  async run(factory: Factory, connection: Connection): Promise<void> {
    await connection.query(`
      TRUNCATE TABLE
      "car",
      "manufacturer",
      "owner",
      "car_to_owner"
    `);
  }
}
