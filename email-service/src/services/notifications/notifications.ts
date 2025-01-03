import { Patient } from "../../types/Patient";
import EmailService from "./providers/email-provider";

export interface NotificationInterface {
  sendVerificationNotification(patient: Patient): Promise<unknown>;
}

class NotificationService implements NotificationInterface {
  constructor(private service: NotificationInterface) {}

  sendVerificationNotification(patient: Patient): Promise<unknown> {
    return this.service.sendVerificationNotification(patient);
  }
}

export const notificationService = new NotificationService(EmailService);
