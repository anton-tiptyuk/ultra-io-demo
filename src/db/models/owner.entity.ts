import {
  Entity,
  PrimaryColumn,
  Column,
  OneToMany,
} from 'typeorm';

import { CarToOwner } from './carToOwner.entity';

@Entity()
export class Owner {
  @PrimaryColumn({ length: 40 })
  id: string;

  @Column()
  name: string;

  @OneToMany(() => CarToOwner, carToOwners => carToOwners.owner)
  carToOwners: CarToOwner[];
}
