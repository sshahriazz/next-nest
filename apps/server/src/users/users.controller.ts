import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserInput } from './dto/update-user.input';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ChangePasswordInput } from './dto/change-password.input';

@ApiBearerAuth()
@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  // @IsPublic()
  // @Roles(UserRole.USER)
  async findAll() {
    return await this.usersService.listUser();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.singleUser({ id });
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: string,
    @Body() updateUserDto: UpdateUserInput,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }
  @Patch('changepassword/:id')
  changePassword(
    @Param('id') id: string,
    @Body() changePassword: ChangePasswordInput,
  ) {
    return this.usersService.changePassword(id, changePassword);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
