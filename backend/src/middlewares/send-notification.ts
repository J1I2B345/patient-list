import { NextFunction, Request, Response } from 'express';

import { BadRequestError } from '../errors/bad-request-error';
import { notificationService } from '../services/notifications/notifications';
import { logInfo } from '../utils/logger';

export const sendNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { patient } = req;
    if (!patient) {
      throw new BadRequestError('Patient is required to send notification');
    }

    logInfo('Sending notification to patient', { patient: patient });

    await notificationService.sendVerificationNotification(patient);
    if (!res.headersSent) {
      res.status(200).send('Notification succesfully sent to patient');
    }
  } catch (error) {
    next(error);
  }
};
