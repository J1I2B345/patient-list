import { NextFunction, Request, Response } from 'express';
import patientService from '../../services/patients';
import { StorageService } from '../../services/storage';
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
    // TODO: create a DTO for the patient
    const photoUrl = await StorageService.getInstance().getDownloadUrl(
      req.body?.photoUrl
    );
    res.status(201).send({ data: { ...patient.toJSON(), photoUrl } });
    next();
  } catch (error: any) {
    if (req.body?.photoUrl)
      await StorageService.getInstance().deleteFile(req.body?.photoUrl);
    next(error);
  }
};

export default createPatient;
