import React from 'react';
import { ErrorField } from '@/app/utils/types';
import ModalErrorBody from './ErrorModal';
import ModalSuccessBody from './SuccessModal';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  errors: ErrorField[];
}

const Modal: React.FC<ModalProps> = ({ open, onClose, errors }) => {
  if (!open) return null;
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg max-w-lg w-full shadow-lg relative"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="absolute top-3 right-3 text-2xl text-gray-500 hover:text-gray-700"
          onClick={onClose}
        >
          &times;
        </button>
        {errors.length ? (
          <ModalErrorBody errors={errors} />
        ) : (
          <ModalSuccessBody />
        )}
      </div>
    </div>
  );
};

export default Modal;
