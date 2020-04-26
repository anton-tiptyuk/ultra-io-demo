import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';

import { decimalTransformer } from '../../common/util';

import { Manufacturer } from './manufacturer.entity';
import { CarToOwner } from './carToOwner.entity';

@Entity()
// @Index('uq_box_title_lower', { synchronize: false })
export class Car {
  @PrimaryColumn({ length: 40 })
  id: string;

  @ManyToOne(() => Manufacturer, { onDelete: 'CASCADE', nullable: false })
  manufacturer: Manufacturer;

  @Column('decimal', { precision: 10, scale: 2, transformer: decimalTransformer })
  price: number;

  @Column()
  firstRegistrationDate: Date;

  @OneToMany(() => CarToOwner, carToOwners => carToOwners.car)
  carToOwners: CarToOwner[];
}
