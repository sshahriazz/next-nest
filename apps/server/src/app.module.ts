import { Logger, Module } from '@nestjs/common';
import {
  PrismaClientExceptionFilter,
  PrismaModule,
  QueryInfo,
  loggingMiddleware,
} from 'nestjs-prisma';
import { UsersModule } from './users/users.module';

import { APP_FILTER, HttpAdapterHost } from '@nestjs/core';

@Module({
  imports: [
    UsersModule,
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
        prismaOptions: {
          errorFormat: 'pretty',
          log: ['warn', 'error'],
        },
        explicitConnect: true,
      }),
    }),
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
