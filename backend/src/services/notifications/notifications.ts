import { User } from '../../database/models/User';
import EmailService from './providers/emailProvider';

export interface NotificationInterface {
  sendNotification(message: string, user: User): Promise<unknown>;
}

class NotificationService implements NotificationInterface {
  constructor(private service: NotificationInterface) {}

  sendNotification(message: string, user: User): Promise<unknown> {
    return this.service.sendNotification(message, user);
  }
}

export const notificationService = new NotificationService(EmailService);
