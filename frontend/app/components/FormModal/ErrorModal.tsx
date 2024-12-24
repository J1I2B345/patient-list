import { ErrorField } from '@/app/utils/types';

function ModalErrorBody({ errors }: { errors: ErrorField[] }) {
  return (
    <div className="bg-red-50 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-red-700 mb-4">
        Oops! We found some errors.
      </h2>
      <p className="text-sm ">Please review the following and try again.</p>
      <ul className="list-inside list-disc pl-5 space-y-2">
        {errors.map((e, i) => (
          <li key={i} className="text-sm p-2">
            {`${e.field ? `${e.field} : ` : ''}${e.message}`}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ModalErrorBody;
