import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MailerService as NodeMailerService } from '@nestjs-modules/mailer';
import { Options } from 'nodemailer/lib/smtp-transport';
import { google } from 'googleapis';
import { MailConfig } from '@server/common/configs/config.interface';

@Injectable()
export class MailerService {
  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: NodeMailerService,
  ) {}
  mailConfig = this.configService.get<MailConfig>('mail');
  private async setTransport() {
    const OAuth2 = google.auth.OAuth2;
    const oauth2Client = new OAuth2(
      this.mailConfig.clientId,
      this.mailConfig.clientSecret,
      'https://developers.google.com/oauthplayground',
    );
    console.log(this.mailConfig.refreshToken);

    oauth2Client.setCredentials({
      token_type: 'Bearer',
      refresh_token: this.mailConfig.refreshToken,
    });

    const accessToken: string = await new Promise((resolve, reject) => {
      oauth2Client.getAccessToken((err, token) => {
        if (err) {
          reject('Failed to create access token');
        }
        resolve(token);
      });
    });

    const config: Options = {
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: this.mailConfig.email,
        clientId: this.mailConfig.clientId,
        clientSecret: this.mailConfig.clientSecret,
        accessToken,
      },
    };
    this.mailerService.addTransporter('gmail', config);
  }

  async sendMail(context: Record<string, any>, template: string, to: string) {
    await this.setTransport();
    await this.mailerService.sendMail({
      transporterName: 'gmail',
      to: to, // list of receivers
      from: 'shahriazkobir.com', // sender address
      subject: 'Verficiaction Code', // Subject line
      template: template,
      context: {
        ...context,
      },
    });
  }
}
