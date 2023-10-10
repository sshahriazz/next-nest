import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ConfigModule, ConfigService } from '@nestjs/config';
import config from '@server/common/configs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { DbConfig } from './common/configs/config.interface';
import { JwtAuthGuard } from './auth/jwt.guard';
import { RoleGuard } from './auth/role/role.guard';
import { TypeOrmExceptionFilter } from './common/filters/TypeOrmExceptionFilter';
import { MailerModule as MailingModule } from './mailer/mailer.module';
import { MailerModule } from '@nestjs-modules/mailer';
import { HandlebarsAdapter } from '@nestjs-modules/mailer/dist/adapters/handlebars.adapter';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        const config = configService.get<DbConfig>('db');
        return {
          type: 'postgres',
          host: config.host,
          port: config.port,
          username: config.username,
          password: config.password,
          database: config.database,
          autoLoadEntities: true,
          synchronize: true,
          entities: ['dist/**/*.entity{.ts,.js}'],
        };
      },
      inject: [ConfigService],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [config],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60 * 60,
        limit: 100,
      },
    ]),
    UsersModule,
    AuthModule,
    MailingModule,
    MailerModule.forRoot({
      transport: 'smtps://user@domain.com:pass@smtp.domain.com',
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(),
        options: {
          strict: true,
        },
      },
    }),
  ],
  controllers: [AppController],
  providers: [
    {
      provide: APP_FILTER,
      useClass: TypeOrmExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class AppModule {}
