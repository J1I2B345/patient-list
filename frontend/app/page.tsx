'use client';
import axios from 'axios';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Patient } from './utils/types';
import { getPatients, savePatients } from './utils/locaStorage';
import CardContainer from './components/PatientCard/CardContainer';
import LoadingSpinner from './components/Loader';

import React from 'react';
import { PrimaryButton } from './components/Buttons';

export default function Home() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const patientsFromLocalStorage = getPatients();
    if (patientsFromLocalStorage) {
      if (patientsFromLocalStorage.length) {
        setPatients(patientsFromLocalStorage);
      }
      setLoading(false);
      return;
    }
    axios
      .get('/api/patients')
      .then(({ data }) => {
        savePatients(data?.data);
        setPatients(data?.data);
      })
      .catch()
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="w-dvw flex justify-center p-4">
        <PrimaryButton
          onClick={() => redirect('/form')}
          text="Add patient"
          className="w-full sm:w-1/3"
        />
      </div>
      {loading ? <LoadingSpinner /> : <CardContainer patients={patients} />}
    </div>
  );
}

export const Form = () => {
  return <form></form>;
};
