import { Patient } from '../../database/models/Patient';
import EmailService from './providers/email-provider';

export interface NotificationInterface {
  sendNotification(
    message: { text: string; html?: string },
    patient: Patient
  ): Promise<unknown>;
}

class NotificationService implements NotificationInterface {
  constructor(private service: NotificationInterface) {}

  sendNotification(
    message: { text: string; html?: string },
    patient: Patient
  ): Promise<unknown> {
    return this.service.sendNotification(message, patient);
  }
}

export const notificationService = new NotificationService(EmailService);
