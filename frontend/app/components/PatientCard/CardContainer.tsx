import { Patient } from '@/app/utils/types';
import Card from './Card';

const CardContainer = ({ patients }: { patients: Patient[] }) => {
  return (
    <div className="p-6">
      {patients.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {patients.map((patient, index) => (
            <Card key={index} patient={patient} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">
          <p>No items available. Add something to get started!</p>
        </div>
      )}
    </div>
  );
};

export default CardContainer;
