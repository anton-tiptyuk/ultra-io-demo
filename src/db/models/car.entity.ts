import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { IsNotEmpty, IsOptional, MaxLength, IsObject, IsNumber } from 'class-validator';
import { CrudValidationGroups } from "@nestjsx/crud";

import { decimalTransformer } from '../../common/util';

import { Manufacturer } from './manufacturer.entity';
import { CarToOwner } from './carToOwner.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
// @Index('uq_box_title_lower', { synchronize: false })
export class Car {
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @MaxLength(40, { always: true })
  @PrimaryColumn({ length: 40 })
  id: string;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsObject({ always: true })
  @ManyToOne(() => Manufacturer, { onDelete: 'CASCADE', nullable: false })
  manufacturer: Manufacturer;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsNumber({}, { always: true })
  @Column('decimal', { precision: 10, scale: 2, transformer: decimalTransformer })
  price: number;

  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  firstRegistrationDate: Date;

  @OneToMany(() => CarToOwner, carToOwners => carToOwners.car)
  carToOwners: CarToOwner[];
}
