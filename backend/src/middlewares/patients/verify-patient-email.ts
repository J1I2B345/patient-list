import { NextFunction, Request, Response } from 'express';
import patientService from '../../services/patients';
import { logInfo } from '../../utils/logger';

const verifyPatientEmail = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await patientService.verifyEmail(Number(req.params.id));
    logInfo('Patient email verified', { patient: patient });
    res.status(200).send('Your account was succesfully verified!');
  } catch (error) {
    next(error);
  }
};

export default verifyPatientEmail;
