import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { CarToOwner } from './carToOwner.entity';

@Entity()
export class Owner {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  purchaseDate: Date;

  @OneToMany(() => CarToOwner, carToOwners => carToOwners.owner)
  carToOwners: CarToOwner[];
}
