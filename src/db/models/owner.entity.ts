import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToMany,
  JoinTable,
} from 'typeorm';

import { Car } from './car.entity';

@Entity()
export class Owner {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  purchaseDate: Date;

  @ManyToMany(() => Car)
  @JoinTable()
  cars: Car[];
}
