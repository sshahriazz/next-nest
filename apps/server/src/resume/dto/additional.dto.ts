import { ApiProperty } from '@nestjs/swagger';

export class CreateAdditionalDto {
  @ApiProperty({ type: String })
  id: string;
}
