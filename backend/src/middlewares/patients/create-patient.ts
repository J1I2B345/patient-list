import { NextFunction, Request, Response } from 'express';
import patientService from '../../services/patients';
import { storageService } from '../../services/storage';
import { PatientCreationAttributes } from '../../database/models/Patient';

const createPatient = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const patient = await patientService.create(
      req.body as PatientCreationAttributes
    );

    req.patient = patient;

    res.status(201).send({ data: patient });
    next();
  } catch (error: any) {
    if (req.body?.photoUrl) await storageService.deleteFile(req.body?.photoUrl);
    next(error);
  }
};

export default createPatient;
