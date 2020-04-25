import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateStructures1587816448345 implements MigrationInterface {
  name = 'CreateStructures1587816448345'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`CREATE TABLE "manufacturer" ("id" character varying(40) NOT NULL, "name" character varying NOT NULL, "phone" character varying NOT NULL, "siret" character varying NOT NULL, CONSTRAINT "PK_81fc5abca8ed2f6edc79b375eeb" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "owner" ("id" character varying(40) NOT NULL, "name" character varying NOT NULL, CONSTRAINT "PK_8e86b6b9f94aece7d12d465dc0c" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "car_to_owner" ("id" SERIAL NOT NULL, "purchase_date" TIMESTAMP NOT NULL, "car_id" character varying(40), "owner_id" character varying(40), CONSTRAINT "PK_01642484b8d673614f4885ccff5" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`CREATE TABLE "car" ("id" character varying(40) NOT NULL, "price" numeric(10,2) NOT NULL, "first_registration_date" TIMESTAMP NOT NULL, "manufacturer_id" character varying(40) NOT NULL, CONSTRAINT "PK_55bbdeb14e0b1d7ab417d11ee6d" PRIMARY KEY ("id"))`, undefined);
    await queryRunner.query(`ALTER TABLE "car_to_owner" ADD CONSTRAINT "FK_fa5e370e892c645258dcd189690" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    await queryRunner.query(`ALTER TABLE "car_to_owner" ADD CONSTRAINT "FK_11d571197598b8a50e9d4a12c02" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    await queryRunner.query(`ALTER TABLE "car" ADD CONSTRAINT "FK_b04564d061f113e2d060709b026" FOREIGN KEY ("manufacturer_id") REFERENCES "manufacturer"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "car" DROP CONSTRAINT "FK_b04564d061f113e2d060709b026"`, undefined);
    await queryRunner.query(`ALTER TABLE "car_to_owner" DROP CONSTRAINT "FK_11d571197598b8a50e9d4a12c02"`, undefined);
    await queryRunner.query(`ALTER TABLE "car_to_owner" DROP CONSTRAINT "FK_fa5e370e892c645258dcd189690"`, undefined);
    await queryRunner.query(`DROP TABLE "car"`, undefined);
    await queryRunner.query(`DROP TABLE "car_to_owner"`, undefined);
    await queryRunner.query(`DROP TABLE "owner"`, undefined);
    await queryRunner.query(`DROP TABLE "manufacturer"`, undefined);
  }

}
