import {MigrationInterface, QueryRunner} from "typeorm";

export class ReaggregateCarOwners1587815896389 implements MigrationInterface {
    name = 'ReaggregateCarOwners1587815896389'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "car_to_owner" ("id" SERIAL NOT NULL, "purchase_date" TIMESTAMP NOT NULL, "car_id" character varying(40), "owner_id" character varying(40), CONSTRAINT "PK_01642484b8d673614f4885ccff5" PRIMARY KEY ("id"))`, undefined);
        await queryRunner.query(`ALTER TABLE "owner" DROP COLUMN "purchase_date"`, undefined);
        await queryRunner.query(`ALTER TABLE "car_to_owner" ADD CONSTRAINT "FK_fa5e370e892c645258dcd189690" FOREIGN KEY ("car_id") REFERENCES "car"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
        await queryRunner.query(`ALTER TABLE "car_to_owner" ADD CONSTRAINT "FK_11d571197598b8a50e9d4a12c02" FOREIGN KEY ("owner_id") REFERENCES "owner"("id") ON DELETE CASCADE ON UPDATE NO ACTION`, undefined);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "car_to_owner" DROP CONSTRAINT "FK_11d571197598b8a50e9d4a12c02"`, undefined);
        await queryRunner.query(`ALTER TABLE "car_to_owner" DROP CONSTRAINT "FK_fa5e370e892c645258dcd189690"`, undefined);
        await queryRunner.query(`ALTER TABLE "owner" ADD "purchase_date" TIMESTAMP NOT NULL`, undefined);
        await queryRunner.query(`DROP TABLE "car_to_owner"`, undefined);
    }

}
