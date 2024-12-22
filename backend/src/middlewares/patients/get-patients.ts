import { NextFunction, Request, Response } from 'express';
import patientService from '../../services/patients';

const getPatients = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const patients = await patientService.getAll();
    res.status(200).send({ data: patients });
  } catch (error) {
    next(error);
  }
};

export default getPatients;
