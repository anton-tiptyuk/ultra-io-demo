import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import * as Joi from '@hapi/joi';
import * as dotenv from 'dotenv';
import * as path from 'path';

import { SnakeNamingStrategy } from '../db/SnakeNamingStrategy';

interface IEnvConfig {
  [key: string]: any;
}

const DATABASE_HOST = 'DATABASE_HOST';
const DATABASE_PORT = 'DATABASE_PORT';
const DATABASE_NAME = 'DATABASE_NAME';
const DATABASE_USERNAME = 'DATABASE_USERNAME';
const DATABASE_PASSWORD = 'DATABASE_PASSWORD';
const DATABASE_SYNCHRONIZE = 'DATABASE_SYNCHRONIZE';
const DATABASE_LOGGING = 'DATABASE_LOGGING';

const DEFAULT_PORT = 3000;
const ext = path.extname(__filename);
const dbDir = path.relative(process.cwd(), path.resolve(`${__dirname}/../db`));

@Injectable()
export class ConfigService {
  private readonly envConfig: IEnvConfig;

  constructor() {
    dotenv.config();
    this.envConfig = ConfigService.validateConfig(process.env);
  }

  private static validateConfig(config: IEnvConfig): IEnvConfig {
    const schema: Joi.ObjectSchema = Joi.object().keys({
      PORT: Joi.number().default(DEFAULT_PORT),

      [DATABASE_PORT]: Joi.number().default(5432),
      [DATABASE_HOST]: Joi.string().required(),
      [DATABASE_NAME]: Joi.string().required(),
      [DATABASE_USERNAME]: Joi.string().required(),
      [DATABASE_PASSWORD]: Joi.string().required(),
      [DATABASE_SYNCHRONIZE]: Joi.boolean().default(false),
      [DATABASE_LOGGING]: Joi.boolean().default(false),
    });

    const { error, value } = schema.validate(config, { allowUnknown: true });

    if (error)
      throw new Error(`Config validation error: ${error.message}`);

    return value;
  }

  get<T>(key: string): T {
    return this.envConfig[key];
  }

  getOrmConfig() {
    return {
      dropSchema: false,
      entities: [`${dbDir}/models/**/*.entity${ext}`],
      migrations: [`${dbDir}/migrations/**/*${ext}`],
      cli: {
        migrationsDir: `${dbDir}/migrations`,
        // entitiesDir: `${dbDir}/models`,
      },
      namingStrategy: new SnakeNamingStrategy(),
      seeds: [`${dbDir}/seeds/**/*.seed${ext}`],
      factories: [`${dbDir}/factories/**/*.factory${ext}`],

      type: 'postgres',
      host: this.get(DATABASE_HOST),
      port: this.get<number>(DATABASE_PORT),
      database: this.get(DATABASE_NAME),
      username: this.get(DATABASE_USERNAME),
      password: this.get(DATABASE_PASSWORD),
      synchronize: this.get<boolean>(DATABASE_SYNCHRONIZE),
      logging: this.get<boolean>(DATABASE_LOGGING),
    } as TypeOrmModuleOptions;
  }

}
