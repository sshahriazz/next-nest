import { Logger, Module } from '@nestjs/common';
import {
  PrismaClientExceptionFilter,
  PrismaModule,
  QueryInfo,
  loggingMiddleware,
} from 'nestjs-prisma';

import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import configuration from '../config';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 10,
      },
    ]),
    PrismaModule.forRootAsync({
      isGlobal: true,
      //TODO: add env variables
      useFactory: () => ({
        middlewares: [
          loggingMiddleware({
            logger: new Logger('PrismaMiddleware'),
            logLevel: 'log', // default is `debug`
            logMessage: (query: QueryInfo) =>
              `[Prisma Query] ${query.model}.${query.action} - ${query.executionTime}ms`,
          }),
        ],
        // prismaOptions: {
        //   errorFormat: 'pretty',
        //   log: ['warn', 'error'],
        // },
        explicitConnect: true,
      }),
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env'],
      load: [configuration],
    }),
    AuthModule,
    UsersModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useFactory: ({ httpAdapter }: HttpAdapterHost) => {
        return new PrismaClientExceptionFilter(
          httpAdapter,
          //   , {
          //   // Prisma Error Code: HTTP Status Response
          //   P2000: HttpStatus.BAD_REQUEST,
          //   P2002: HttpStatus.CONFLICT,
          //   P2025: HttpStatus.NOT_FOUND,
          // }
        );
      },
      inject: [HttpAdapterHost],
    },
  ],
})
export class AppModule {}
