import { ApiProperty } from '@nestjs/swagger';
import { ResumeDto } from './resume.dto';

export class CertificateDto {
  @ApiProperty({ type: String })
  id: string;

  @ApiProperty({ type: () => ResumeDto })
  resume: ResumeDto;
}
