import nodemailer, { Transporter } from 'nodemailer';

import { NotificationInterface } from '../notifications';
import notificationConfig from '../../../config/notification';
import { User } from '../../../database/models/User';

const {
  email: { service, user, pass, from },
} = notificationConfig;

class EmailService implements NotificationInterface {
  private transporter: Transporter | null = null;
  private from = from;
  constructor() {}
  getService = (): Transporter => {
    if (this.transporter) {
      return this.transporter;
    }
    this.transporter = this.createTransporter();
    return this.transporter;
  };

  sendNotification(message: string, user: User) {
    console.log(`Sending email to user ${user.email}: ${message}`);
    return this.getService().sendMail(this.createMessage(message, user.email));
  }

  createTransporter = (): Transporter => {
    console.log('Creating transporter');
    return nodemailer.createTransport({
      service: service,
      auth: {
        user: user,
        pass: pass,
      },
    });
  };

  createMessage = (message: string, to: string) => {
    return {
      from: this.from,
      to,
      subject: 'Message',
      text: message,
    };
  };
}

export default new EmailService();
