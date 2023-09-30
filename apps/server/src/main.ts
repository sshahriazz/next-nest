import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ConfigService } from '@nestjs/config';
import * as compression from 'compression';
import * as session from 'express-session';
import * as cookieParser from 'cookie-parser';
import {
  NestConfig,
  CorsConfig,
  SwaggerConfig,
  SessionConfig,
} from '@server/common/configs/config.interface';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import {
  HttpException,
  HttpStatus,
  ValidationPipe,
  VersioningType,
} from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const nestConfig = configService.get<NestConfig>('nest');
  const corsConfig = configService.get<CorsConfig>('cors');
  const swaggerConfig = configService.get<SwaggerConfig>('swagger');
  const sessionConfig = configService.get<SessionConfig>('session');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: false,
      exceptionFactory: (errors) => {
        return new HttpException(
          {
            statusCode: 400,
            message: errors.map((error) => {
              return {
                property: error.property,
                constraints: Object.values(error.constraints).join(', '),
              };
            }),
          },
          400,
        );
      },
    }),
  );

  if (corsConfig.enabled) {
    app.enableCors({
      origin: 'http://localhost:3000',
      credentials: true,
    });
  }
  app.use(helmet());
  app.use(cookieParser());
  app.use(compression());
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(
    session({
      secret: sessionConfig.secret,
      resave: sessionConfig.resave,
      saveUninitialized: sessionConfig.saveUninitialized,
    }),
  );

  if (swaggerConfig.enabled) {
    const config = new DocumentBuilder()
      .setTitle(swaggerConfig.title)
      .setDescription(swaggerConfig.description)
      .setVersion(swaggerConfig.version)
      .setBasePath(swaggerConfig.path)
      .addBearerAuth()
      .build();

    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup(swaggerConfig.path, app, document);
  }

  await app.listen(nestConfig.port);
  console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
