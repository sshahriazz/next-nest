import { HttpStatus } from '@nestjs/common';

export interface Config {
  nest: NestConfig;
  cors: CorsConfig;
  swagger: SwaggerConfig;
  security: SecurityConfig;
  db: DbConfig;
  mail: MailConfig;
  session: SessionConfig;
}
export interface MailConfig {
  clientId: string;
  clientSecret: string;
  email: string;
  refreshToken: string;
}

export interface DbConfig {
  type: string;
  host: string;
  port: number;
  username: string;
  password: string;
  database: string;
}

export interface NestConfig {
  port: number;
  url: string;
}

export interface SessionConfig {
  secret: string;
  resave: boolean;
  saveUninitialized: boolean;
}

export interface CorsConfig {
  enabled: boolean;
}

export interface SwaggerConfig {
  enabled: boolean;
  title: string;
  description: string;
  version: string;
  path: string;
}

export interface SecurityConfig {
  expiresIn: string;
  refreshIn: string;
  bcryptSaltOrRound: string | number;
}

export interface ResponseObject<T> {
  message: string;
  url: string;
  data?: T;
  status: HttpStatus;
}
