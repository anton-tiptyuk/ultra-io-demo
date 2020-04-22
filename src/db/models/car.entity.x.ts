import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Index,
  BeforeUpdate,
} from 'typeorm';

// import { Exclude } from 'class-transformer';
// import { BoxToUser } from './boxToUser.entity';

@Entity()
// @Index('uq_box_title_lower', { synchronize: false })
export class Car {
  @PrimaryGeneratedColumn() id: number;

  // @Column({ length: 100 })
  // title: string;

  // @Column({ length: 100, unique: true })
  // barcode: string;

  // @Column({ length: 5 })
  // currency: string;

  // @ManyToOne((type) => PayDestination, { onDelete: 'CASCADE', nullable: true })
  // payDestination: PayDestination;

  // @Column()
  // allowCash: boolean;

  // @Column()
  // allowCashless: boolean;

  // @Exclude()
  // @CreateDateColumn()
  // createdAt: Date;

  // @Exclude()
  // @UpdateDateColumn()
  // updatedAt: Date;

  // @Exclude()
  // @OneToMany((type) => BoxToUser, boxToUser => boxToUser.box)
  // boxToUsers: BoxToUser[];

  // private checkPaymentStuff() {
  //   if (this.payDestination && !this.allowCashless)
  //     throw new BadRequestException('You should enable cashless payments to set payment destination');
  //   if (this.allowCashless && !this.payDestination)
  //     throw new BadRequestException('You should set payment destination to enable cashless payments');
  //   if (!(this.allowCash || this.allowCashless))
  //     throw new BadRequestException('The box should have at least one payment method enabled');
  // }

  // @BeforeUpdate()
  // beforeUpdate() {
  //   this.checkPaymentStuff();
  // }

}
