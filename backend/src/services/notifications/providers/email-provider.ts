import axios from 'axios';

import { NotificationInterface } from '../notifications';
import notificationConfig from '../../../config/notification';
import { Patient } from '../../../database/models/Patient';

const {
  email: { baseUrl },
} = notificationConfig;

class EmailService implements NotificationInterface {
  constructor() {}

  sendVerificationNotification(patient: Patient) {
    console.log(`Sending email to patient ${patient.email}`);
    return axios.post(`${baseUrl}/send-verification-email`, {
      patient,
    });
  }
}

export default new EmailService();
