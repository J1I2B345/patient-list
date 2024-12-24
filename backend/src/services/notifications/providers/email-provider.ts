import nodemailer, { Transporter } from 'nodemailer';

import { NotificationInterface } from '../notifications';
import notificationConfig from '../../../config/notification';
import { Patient } from '../../../database/models/Patient';

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

  sendNotification(message: { text: string; html?: string }, patient: Patient) {
    console.log(`Sending email to patient ${patient.email}`);
    return this.getService().sendMail(
      this.createMessage(message, patient.email)
    );
  }

  createTransporter = (): Transporter => {
    return nodemailer.createTransport({
      service: service,
      auth: {
        user: user,
        pass: pass,
      },
    });
  };

  createMessage = (message: { text: string; html?: string }, to: string) => {
    return {
      from: this.from,
      to,
      subject: 'Message',
      text: message.text,
      ...(message.html && { html: message.html }),
    };
  };
}

export default new EmailService();
