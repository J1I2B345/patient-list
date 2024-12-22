import { NextFunction, Request, Response } from 'express';
import { CustomError } from '../errors/custom-error';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response<{ errors: { message: string; field?: string }[] }>,
  next: NextFunction
) => {
  // TODO: replace with logger
  console.log(
    'error not instance of CustomError',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).response?.data || error.message
  );

  if (res.headersSent) {
    // if response was already sent do not send again, just log
    console.log('Response already sent');
    return next();
  }

  if (error instanceof CustomError) {
    res.status(error.statusCode).send({ errors: error.serializeErrors() });
    return;
  }

  // TODO: replace with logger
  console.log(
    'error not instance of CustomError',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (error as any).response?.data || error.message
  );
  res.status(400).send({
    errors: [{ message: 'Something went wrong' }],
  });
  next();
};
