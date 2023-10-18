import { ApiProperty } from '@nestjs/swagger';

export class CreateCertificateDto {
  @ApiProperty({ type: String })
  id: string;
}
