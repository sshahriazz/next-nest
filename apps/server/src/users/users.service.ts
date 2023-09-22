import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private config: ConfigService,
  ) {}
}
