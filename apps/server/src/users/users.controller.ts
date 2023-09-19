import { Body, Controller, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './entity/user.entity';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';

@Controller('users')
@ApiTags('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('create')
  @ApiOkResponse({ type: UserEntity })
  async createUser(@Body() userInput: CreateUserDto): Promise<UserEntity> {
    return this.usersService.createUser(userInput);
  }
}
