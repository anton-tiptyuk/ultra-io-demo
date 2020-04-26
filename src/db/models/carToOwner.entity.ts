import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
} from 'typeorm';

import { Car } from './car.entity';
import { Owner } from './owner.entity';

@Entity()
export class CarToOwner {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Car, car => car.carToOwners, { onDelete: 'CASCADE' })
  car: Car;

  @ManyToOne(() => Owner, owner => owner.carToOwners, { onDelete: 'CASCADE' })
  owner: Owner;

  @Column()
  purchaseDate: Date;
}
