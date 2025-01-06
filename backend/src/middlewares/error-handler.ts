import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';
import { logError, logWarn } from '../utils/logger';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<{ errors: { message: string; field?: string }[] }>,
  next: NextFunction
) => {
  if (res.headersSent) {
    // if response was already sent do not send again, just log
    logWarn('Response already sent', {
      message: 'Response was already sent, do not send again',
    });
    return next();
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).send({ errors: error.serializeErrors() });
    return;
  }

  logError('Unknown error', { error: error });
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
  next();
};
