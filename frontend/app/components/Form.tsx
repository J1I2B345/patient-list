import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { PhoneInput, PhoneProvider } from './PhoneNumber/phoneNumber';
import Modal from './FormModal/Modal';
import { addPatient } from '../utils/locaStorage';
import { validateGmail, validateMobilePhone } from '../utils/validations';
import { ErrorField, Patient } from '../utils/types';
import InputWithError from './TextInput';
import { SecondaryButton, SubmitButton } from './Buttons';

enum FormFieldName {
  EMAIL = 'email',
  NAME = 'name',
  PHONE_NUMBER = 'phoneNumber',
  DOCUMENT_PHOTO = 'file',
}

type FormField = {
  name: FormFieldName;
  text: string;
  type: React.HTMLInputTypeAttribute;
  required: boolean;
  id: string;
  onChange: (event: Event) => void;
  onBlur: () => void;
  pattern?: string;
  validation?: (value: string) => string | null;
};

const formFields: Omit<FormField, 'onChange' | 'onBlur'>[] = [
  {
    name: FormFieldName.EMAIL,
    type: 'email',
    text: 'Email',
    required: true,
    id: FormFieldName.EMAIL,
    validation: (value: string) => {
      if (typeof value === 'string') {
        const { isValidEmail, isGmail } = validateGmail(value);
        if (!isValidEmail) return 'Invalid email format';
        if (!isGmail) return 'Only Gmail addresses are allowed';
      }
      return null;
    },
  },
  {
    name: FormFieldName.NAME,
    type: 'string',
    text: 'Name',
    required: true,
    id: 'name',
    validation: (value: string) => {
      if (typeof value === 'string') {
        const trimmedValue = value.trim();
        if (trimmedValue.length < 2 || trimmedValue.length > 50)
          return 'Name must contain 2 to 50 characters';
      }
      return null;
    },
  },
  {
    name: FormFieldName.DOCUMENT_PHOTO,
    type: 'file',
    text: 'Document photo',
    required: true,
    id: FormFieldName.DOCUMENT_PHOTO,
    validation: (value: string) => {
      const valueToLowerCase = value.toLowerCase();
      if (
        !(valueToLowerCase as string).endsWith('.jpg') &&
        !(valueToLowerCase as string).endsWith('.jpeg')
      ) {
        return 'Only .jpg or .jpeg images are allowed';
      }

      return null;
    },
  },
];

const formValidations: Omit<FormField, 'onChange' | 'onBlur'>[] = [
  ...formFields,
  {
    name: FormFieldName.PHONE_NUMBER,
    type: 'string',
    text: 'Phone Number',
    required: true,
    id: FormFieldName.PHONE_NUMBER,
    validation: (value: string | File) => {
      if (typeof value === 'string') {
        if (!validateMobilePhone(value))
          return 'Please insert a valid number phone, e.g: 5491122334455';
      }
      return null;
    },
  },
];

const initialFieldValues: Record<string, string> = {};
const initialTouchedFields: Record<string, boolean> = {};
for (const name of formFields.map((e) => e.name)) {
  initialFieldValues[name] = '';
  initialTouchedFields[name] = false;
}

export function getFieldError(name: FormFieldName, value: string | undefined) {
  if (!value) return 'Field is required';
  const errorMessage = formValidations
    .find((inputData) => inputData.name === name)
    ?.validation?.(value);
  return errorMessage || null;
}

function Input({
  name,
  text,
  wasSubmitted,
  type,
}: {
  name: string;
  type: React.HTMLInputTypeAttribute;
  wasSubmitted: boolean;
  text: string;
}) {
  const [value, setValue] = React.useState('');
  const [touched, setTouched] = React.useState(false);
  const errorMessage = getFieldError(name as FormFieldName, value);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  return (
    <div key={name} className="mb-4">
      <label
        className="block font-medium text-gray-700"
        htmlFor={`${name}-input`}
      >
        {text}:
      </label>{' '}
      <InputWithError
        name={name}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        errorMessage={errorMessage}
        displayErrorMessage={!!displayErrorMessage}
        type={type || 'text'}
        value={value}
      />
    </div>
  );
}

const validateField = (name: string, value: object | string) => {
  const valueToCheck =
    (typeof value === 'string' && value) ||
    (typeof value === 'object' && (value as { name: string }).name);
  if (!valueToCheck) return 'Error';
  return !getFieldError(name as FormFieldName, valueToCheck);
};

const validateForm = (fieldValues: Record<string, FormDataEntryValue>) => {
  return Object.entries(fieldValues).every(([name, value]) =>
    validateField(name, value)
  );
};

function Form({ openModal }: { openModal: (errors: ErrorField[]) => void }) {
  const [wasSubmitted, setWasSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const router = useRouter();

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    try {
      const formData = new FormData(event.currentTarget);
      const fieldValues = Object.fromEntries(formData.entries());
      const formIsValid = validateForm(fieldValues);

      setWasSubmitted(true);
      if (formIsValid) {
        const { status, data } = await axios.post<{ data: Patient }>(
          '/api/patients',
          formData
        );
        if (status === 201) {
          addPatient(data.data);
          openModal([]);
        }
      }
    } catch (error) {
      openModal(error.response?.data?.errors || []);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form
        noValidate
        className="w-full max-w-sm p-6 bg-white rounded-lg shadow-md"
        onSubmit={handleSubmit}
      >
        {formFields.map(({ name, type, text }) => (
          <Input
            key={name}
            name={name}
            text={text}
            type={type}
            wasSubmitted={wasSubmitted}
          />
        ))}
        <PhoneProvider>
          <PhoneInput
            name="phoneNumber"
            text="Phone Number"
            wasSubmitted={wasSubmitted}
          />
        </PhoneProvider>

        <SubmitButton isSubmitting={isSubmitting}>Submit</SubmitButton>
        <SecondaryButton
          loading={isSubmitting}
          onClick={() => router.push('/')}
        >
          Back
        </SecondaryButton>
      </form>
    </div>
  );
}

function WrappedForm() {
  const [open, toggleOpen] = React.useState(false);
  const [errors, setErrors] = React.useState<ErrorField[]>([]);
  const router = useRouter();
  return (
    <div className="container mx-auto w-vw h-vh">
      {open ? (
        <Modal
          open={true}
          onClose={() => {
            toggleOpen(!open);
            if (errors.length) {
              router.push('/');
            }
          }}
          errors={errors}
        />
      ) : (
        <></>
      )}
      <hr />
      <div className="container mx-auto">
        <Form
          openModal={(errors: ErrorField[]) => {
            toggleOpen(true);
            setErrors(errors);
          }}
        />
      </div>
    </div>
  );
}

export default WrappedForm;
