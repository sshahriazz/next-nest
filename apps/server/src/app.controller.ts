import { Controller, Get, Session, Version } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Roles } from './auth/roles/roles.decorator';
import { UserRole } from './users/entities/user.entity';

@ApiTags('App')
@ApiBearerAuth()
@Controller()
export class AppController {
  @Version('1')
  @Get()
  @Roles(UserRole.ADMIN, UserRole.USER)
  getHello(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return { message: 'authenticated and visited:' + session.visits };
  }
}
