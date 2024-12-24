import { NextFunction, Request, Response } from 'express';
import { BadRequestError } from '../errors/bad-request-error';
import { notificationService } from '../services/notifications/notifications';
import { createVerificationEmail } from '../utils/emailService';

// TODO migrate this to a SQS or similar
export const sendNotification = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    console.log('sending notif');
    const { patient } = req;
    if (!patient) {
      throw new BadRequestError('Patient is required to send notification');
    }

    const { text, html } = createVerificationEmail(patient);

    await notificationService.sendNotification({ html, text }, patient);
    if (!res.headersSent) {
      res.status(200).send('Notification succesfully sent to patient');
    }
  } catch (error) {
    next(error);
  }
};
