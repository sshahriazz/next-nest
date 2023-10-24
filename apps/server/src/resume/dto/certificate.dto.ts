import { ApiProperty } from '@nestjs/swagger';
import { Certificate } from '../entity/certificate.entity';

export class CreateCertificateDto extends Certificate {}
export class UpdateCertificateDto extends CreateCertificateDto {}
