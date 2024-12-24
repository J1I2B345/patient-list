import { Patient } from '@/app/utils/types';
import Image from 'next/image';
import { useState } from 'react';
import LoadingSpinner from '../Loader';

const Title = ({ title }: { title: string }) => {
  return <h2 className="text-lg font-bold text-gray-800">{title}</h2>;
};

const Subtitle = ({
  title,
  className = '',
}: {
  title: string;
  className?: string;
}) => {
  return (
    <h3 className={`text-md font-semibold text-gray-600 ${className}`}>
      {title}
    </h3>
  );
};

const PatientCard = ({ patient }: { patient: Patient }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-white shadow-lg rounded-lg p-10">
      <Title title={`Paciente: ${patient.name}`}></Title>
      {!expanded && (
        <Image
          src={patient.photoUrl}
          height={100}
          width={400}
          alt={patient.name}
          loading="lazy"
          // TODO add loader img
          // loader={}
        />
      )}
      {expanded && (
        <>
          <Title title={'Phone:'} />
          <Subtitle title={patient.phoneNumber} />
          <Title title={'Email:'} />
          <Subtitle title={patient.email} />
        </>
      )}

      <button onClick={() => setExpanded(!expanded)}>
        {expanded ? 'Show Less' : 'Show More'}
      </button>
    </div>
  );
};

export default PatientCard;
