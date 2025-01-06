import axios from 'axios';

import { NotificationInterface } from '../notifications';
import notificationConfig from '../../../config/notification';
import { Patient } from '../../../database/models/Patient';
import { logInfo } from '../../../utils/logger';

const {
  email: { baseUrl },
} = notificationConfig;

class EmailService implements NotificationInterface {
  constructor() {}

  sendVerificationNotification(patient: Patient) {
    logInfo('Sending email to patient', { patient: patient });
    return axios.post(`${baseUrl}/send-verification-email`, {
      patient,
    });
  }
}

export default new EmailService();
