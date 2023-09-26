import type { Config } from './config.interface';

const config: Config = {
  nest: {
    port: 4000,
  },
  cors: {
    enabled: true,
  },
  db: {
    database: 'nest-next',
    host: 'localhost',
    password: 'polash',
    port: 5432,
    type: 'postgres',
    username: 'polash',
  },
  swagger: {
    enabled: true,
    title: 'Nestjs API',
    description: 'The nestjs API description',
    version: '1.5',
    path: 'api',
  },
  session: {
    resave: false,
    saveUninitialized: false,
    secret: 'my-secret',
  },
  security: {
    expiresIn: '200m',
    refreshIn: '7d',
    bcryptSaltOrRound: 10,
  },
};

export default (): Config => config;
