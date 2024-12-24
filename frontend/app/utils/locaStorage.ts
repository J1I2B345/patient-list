import { Patient } from './types';

const getPatients = (): Patient[] => {
  const patients = localStorage.getItem('patients');
  return patients ? JSON.parse(patients) : null;
};

const savePatients = (patients: Patient[]) => {
  localStorage.setItem('patients', JSON.stringify(patients));
};

const addPatient = (patient: Patient) => {
  const patients = getPatients() || [];
  patients.push(patient);
  savePatients(patients);
};


export { getPatients, savePatients, addPatient };
