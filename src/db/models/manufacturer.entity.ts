import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity()
export class Manufacturer {
  @PrimaryColumn({ length: 40 })
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  siret: string;
}
