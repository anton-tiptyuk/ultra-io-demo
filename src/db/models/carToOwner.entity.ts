import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
} from 'typeorm';

import { Car } from './car.entity';
import { Owner } from './owner.entity';

@Entity()
// @Index('uq_box_title_lower', { synchronize: false })
export class CarToOwner {
  @PrimaryGeneratedColumn()
  id: number;

  // index
  @ManyToOne(() => Car, car => car.carToOwners, { onDelete: 'CASCADE' })
  car: Car;

  @ManyToOne(() => Owner, owner => owner.carToOwners, { onDelete: 'CASCADE' })
  owner: Owner;
}
