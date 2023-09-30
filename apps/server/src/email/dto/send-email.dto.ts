import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEmpty, IsString } from 'class-validator';

export class SendEmailDto {
  @ApiProperty({ example: 'from@gmail.com' })
  @IsEmail()
  from: string;
  @ApiProperty({ example: 'to@gmail.com' })
  @IsEmail()
  to: string;
  @ApiProperty()
  @IsEmpty()
  subject: string;
  @ApiProperty()
  @IsEmpty()
  text: string;
  @ApiProperty({ example: '<div>Your Html</div>' })
  @IsEmpty()
  @IsString()
  html?: string;
}
