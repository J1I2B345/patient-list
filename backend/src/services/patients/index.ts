import {
  Patient,
  PatientAttributes,
  PatientCreationAttributes,
} from '../../database/models/Patient';
import { BadRequestError } from '../../errors/bad-request-error';
import { logInfo } from '../../utils/logger';
import { StorageService } from '../storage';

class PatientService {
  constructor() {}
  async create(patient: PatientCreationAttributes) {
    return await Patient.create(patient);
  }
  async update(patient: Patient, newData: Partial<PatientAttributes>) {
    return Patient.update(newData, {
      where: { id: patient.id },
      returning: true,
    });
  }
  async delete(patient: Patient) {
    logInfo('Deleting patient', { patient: patient });
    throw new Error('Not implemented');
  }
  async getById(id: number) {
    return Patient.findByPk(id);
  }
  async getAll() {
    const patients = await Patient.findAll();
    //recover url from firebase
    return Promise.all(
      patients.map(async (patient) => {
        patient.photoUrl = await StorageService.getInstance().getDownloadUrl(
          patient.photoUrl
        );
        return patient;
      })
    );
  }
  async getByEmail(email: string) {
    return Patient.findOne({ where: { email } });
  }

  async verifyEmail(id: number) {
    const patient = await this.getById(id);
    if (!patient) throw new BadRequestError('Patient not found');
    return this.update(patient, { isVerified: true });
  }
}

export default new PatientService();
