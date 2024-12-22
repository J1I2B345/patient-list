import express from 'express';

import { validateRequest } from '../middlewares/validate-request';
import { uploadPhoto } from '../middlewares/upload-photo';
import { multerMiddleware } from '../middlewares/multer';
import patientMiddlewares from '../middlewares/patients';
import patientValidatorMiddleware from '../middlewares/patients/validations';
import { sendNotification } from '../middlewares/send-notification';

const { createPatient, getPatients, verifyPatientEmail } = patientMiddlewares;
const { validatePatientData, validatePatientId } = patientValidatorMiddleware;

const patientsRouter = express.Router();

patientsRouter.post(
  '/',
  multerMiddleware,
  validatePatientData,
  validateRequest,
  uploadPhoto,
  createPatient,
  sendNotification
);

patientsRouter.get('/', getPatients);
patientsRouter.get('/:id/verify', validatePatientId, verifyPatientEmail);

export default patientsRouter;
