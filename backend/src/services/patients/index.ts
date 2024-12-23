import {
  Patient,
  PatientAttributes,
  PatientCreationAttributes,
} from '../../database/models/Patient';
import { BadRequestError } from '../../errors/bad-request-error';
import { storageService } from '../storage';

class PatientService {
  constructor() {}
  async create(patient: PatientCreationAttributes) {
    return await Patient.create(patient);
  }
  async update(patient: Patient, newData: Partial<PatientAttributes>) {
    console.log('Updating patient', patient);
    return Patient.update(newData, {
      where: { id: patient.id },
      returning: true,
    });
  }
  async delete(patient: Patient) {
    console.log('Deleting patient', patient);
    return patient;
  }
  async getById(id: number) {
    console.log('Getting patient', id);
    return Patient.findByPk(id);
  }
  async getAll() {
    console.log('Getting all patients');
    const patients = await Patient.findAll();
    //recover url from firebase
    return Promise.all(
      patients.map(async (patient) => {
        patient.photoUrl = await storageService.getDownloadUrl(
          patient.photoUrl
        );
        return patient;
      })
    );
  }
  async getByEmail(email: string) {
    console.log('Getting patient by email', email);
    return Patient.findOne({ where: { email } });
  }

  async verifyEmail(id: number) {
    const patient = await this.getById(id);
    if (!patient) throw new BadRequestError('Patient not found');
    return this.update(patient, { isVerified: true });
  }
}

export default new PatientService();
