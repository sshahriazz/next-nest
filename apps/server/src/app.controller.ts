import { Controller, Get, Session, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/jwt.guard';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller()
export class AppController {
  @Get()
  @UseGuards(JwtAuthGuard)
  getHello(@Session() session: Record<string, any>) {
    session.visits = session.visits ? session.visits + 1 : 1;
    return { message: 'authenticated and visited:' + session.visits };
  }
}
