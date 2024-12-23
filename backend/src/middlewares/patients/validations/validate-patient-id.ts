import { check } from 'express-validator';

import patientService from '../../../services/patients';

const validatePatientId = check('id', 'Patient Id must be valid')
  .exists()
  .custom(async (value: string) => {
    const patient = await patientService.getById(Number(value));
    if (!patient) {
      throw new Error('Patient id is not valid');
    }
    return true;
  });

export default validatePatientId;
