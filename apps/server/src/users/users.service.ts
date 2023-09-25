import { BadRequestException, Injectable } from '@nestjs/common';
import { PasswordService } from '@server/auth/password.service';
import { ChangePasswordInput } from './dto/change-password.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    private passwordService: PasswordService,
    @InjectRepository(User) private readonly userRepository: Repository<User>,
  ) {}
  findAll() {
    return `This action returns all users`;
  }
  findOne(id: string) {
    return `This action returns a #${id} user`;
  }
  async update(id: string, updateUserDto: UpdateUserInput) {
    return await this.userRepository.update(id, updateUserDto);
  }
  async changePassword(changePassword: ChangePasswordInput) {
    const user = await this.userRepository.findOne({
      where: { id: changePassword.id },
    });

    const passwordValid = await this.passwordService.validatePassword(
      changePassword.oldPassword,
      user.password,
    );
    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }
    const hashedPassword = await this.passwordService.hashPassword(
      changePassword.newPassword,
    );
    return await this.userRepository.update(user.id, {
      password: hashedPassword,
    });
  }
  async remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
