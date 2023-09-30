import { ExceptionFilter, Catch, ArgumentsHost } from '@nestjs/common';
import { TypeORMError } from 'typeorm';

@Catch(TypeORMError)
export class TypeOrmExceptionFilter implements ExceptionFilter {
  catch(exception: TypeORMError, host: ArgumentsHost) {
    const response = host.switchToHttp().getResponse();

    if (exception?.message) {
      return response.status(400).json({
        message: exception.message,
      });
    }
    return response;
  }
}
