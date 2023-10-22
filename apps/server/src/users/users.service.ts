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

  async listUser() {
    return await this.userRepository.find();
  }
  async singleUser({ id }: { id: string }) {
    const user = await this.userRepository.findOneOrFail({ where: { id } });
    return user;
  }
  async updateUser(id: string, updateUserDto: UpdateUserInput) {
    if (!id || !updateUserDto) {
      throw new BadRequestException('Invalid input');
    }

    const user = await this.userRepository.findOneOrFail({ where: { id } });

    Object.assign(user, updateUserDto);

    return await this.userRepository.save(user);
  }

  async changePassword(
    id: string,
    { oldPassword, newPassword }: ChangePasswordInput,
  ) {
    if (!id || !oldPassword || !newPassword) {
      throw new BadRequestException('Invalid input');
    }

    const user = await this.userRepository.findOneOrFail({ where: { id } });

    const passwordValid = await this.passwordService.validatePassword(
      oldPassword,
      user.password,
    );
    if (!passwordValid) {
      throw new BadRequestException('Invalid password');
    }

    const hashedPassword = await this.passwordService.hashPassword(newPassword);

    return await this.userRepository.update(id, { password: hashedPassword });
  }
  async remove(id: string) {
    return await this.userRepository.delete(id);
  }
}
