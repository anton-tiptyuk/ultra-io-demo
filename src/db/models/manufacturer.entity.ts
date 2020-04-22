import {
  Entity,
  PrimaryColumn,
  Column,
} from 'typeorm';

@Entity()
export class Manufacturer {
  @PrimaryColumn()
  id: string;

  @Column()
  name: string;

  @Column()
  phone: string;

  @Column()
  siret: string;
}
