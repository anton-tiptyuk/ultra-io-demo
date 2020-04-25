import {
  Entity,
  PrimaryColumn,
  Column,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { CrudValidationGroups } from "@nestjsx/crud";
import { IsNotEmpty, IsOptional, MaxLength, IsObject, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

import { decimalTransformer } from '../../common/util';

import { Manufacturer } from './manufacturer.entity';
import { CarToOwner } from './carToOwner.entity';

const { CREATE, UPDATE } = CrudValidationGroups;

@Entity()
export class Car {
  @ApiProperty({ example: '7a570935-3b36-48a2-8889-48ca8810be11' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @MaxLength(40, { always: true })
  @PrimaryColumn({ length: 40 })
  id: string;

  @ApiProperty({ example: { id: 'put manufacturer id here' } })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsObject({ always: true })
  @ManyToOne(() => Manufacturer, { onDelete: 'CASCADE', nullable: false })
  manufacturer: Manufacturer;

  @ApiProperty({ example: 100500 })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @IsNumber({}, { always: true })
  @Column('decimal', { precision: 10, scale: 2, transformer: decimalTransformer })
  price: number;

  @ApiProperty({ example: '2018-08-16T12:47:15.000Z' })
  @IsOptional({ groups: [UPDATE] })
  @IsNotEmpty({ groups: [CREATE] })
  @Column()
  firstRegistrationDate: Date;

  @OneToMany(() => CarToOwner, carToOwners => carToOwners.car)
  carToOwners: CarToOwner[];
}
