import { MigrationInterface, QueryRunner } from "typeorm";

export class Init1587745999512 implements MigrationInterface {
  name = 'Init1587745999512'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "manufacturer" ("id" character varying NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "siret" character varying NOT NULL, CONSTRAINT "PK_81fc5abca8ed2f6edc79b375eeb" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "owner" ("id" character varying NOT NULL, "name" character varying NOT NULL, "purchase_date" TIMESTAMP NOT NULL, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "car" ("id" character varying NOT NULL, "price" numeric(10,2) NOT NULL, "first_registration_date" TIMESTAMP NOT NULL, "manufacturer_id" character varying NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "owner_cars_car" ("owner_id" character varying NOT NULL, "car_id" character varying NOT NULL, CONSTRAINT "PK_a5b4afa8cf44f4f915af6a1828d" PRIMARY KEY ("owner_id", "car_id"))`, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_fec65ef65aa1181808b4347741" ON "owner_cars_car" ("owner_id") `, undefined);
    await queryRunner.query(`CREATE INDEX "IDX_8226693d39846f4d5b54b9f011" ON "owner_cars_car" ("car_id") `, undefined);
    await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_b04564d061f113e2d060709b026" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    await queryRunner.query(`ALTER TABLE "owner_cars_car" ADD CONSTRAINT "FK_fec65ef65aa1181808b43477415" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    await queryRunner.query(`ALTER TABLE "owner_cars_car" ADD CONSTRAINT "FK_8226693d39846f4d5b54b9f0119" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "owner_cars_car" DROP CONSTRAINT "FK_8226693d39846f4d5b54b9f0119"`, undefined);
    await queryRunner.query(`ALTER TABLE "owner_cars_car" DROP CONSTRAINT "FK_fec65ef65aa1181808b43477415"`, undefined);
    await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_b04564d061f113e2d060709b026"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_8226693d39846f4d5b54b9f011"`, undefined);
    await queryRunner.query(`DROP INDEX "IDX_fec65ef65aa1181808b4347741"`, undefined);
    await queryRunner.query(`DROP TABLE "owner_cars_car"`, undefined);
    await queryRunner.query(`DROP TABLE "car"`, undefined);
    await queryRunner.query(`DROP TABLE "owner"`, undefined);
    await queryRunner.query(`DROP TABLE "manufacturer"`, undefined);
  }

}
