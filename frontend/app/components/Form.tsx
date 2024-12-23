import axios from 'axios';
import { useRouter } from 'next/navigation';
import * as React from 'react';

import { PhoneInput, PhoneProvider } from './PhoneNumber/phoneNumber';
import { isMobilePhone } from 'validator';

enum FormFieldName {
  EMAIL = 'email',
  NAME = 'name',
  PHONE_NUMBER = 'phoneNumber',
  DOCUMENT_PHOTO = 'file',
}

function validateGmail(email: string): {
  isValidEmail: boolean;
  isGmail: boolean;
} {
  // Regular expression for validating email
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const isValidEmail = emailRegex.test(email);
  console.log('isValidEmail', isValidEmail);

  const isGmail = isValidEmail && email.endsWith('@gmail.com');
  console.log('isGmail', isGmail);
  return { isValidEmail, isGmail };
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
      if (
        !(value as string).endsWith('.jpg') &&
        !(value as string).endsWith('.jpeg')
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
        if (!isMobilePhone(value))
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
  console.log(name, value);
  const errorMessage = formValidations
    .find((inputData) => inputData.name === name)
    ?.validation?.(value);
  console.log('error message', errorMessage);
  return errorMessage || null;
}

function Input({
  name,
  wasSubmitted,
  type,
}: {
  name: string;
  type: React.HTMLInputTypeAttribute;
  wasSubmitted: boolean;
}) {
  const [value, setValue] = React.useState('');
  const [touched, setTouched] = React.useState(false);
  const errorMessage = getFieldError(name as FormFieldName, value);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  return (
    <div key={name}>
      <label htmlFor={`${name}-input`}>{name}:</label>{' '}
      <input
        id={`${name}-input`}
        name={name}
        type={type || 'text'}
        onChange={(event) => setValue(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        pattern="[a-z]{3,10}"
        required
        aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
      />
      {displayErrorMessage ? (
        <span role="alert" id={`${name}-error`} className="error-message">
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
}

function Form() {
  const [wasSubmitted, setWasSubmitted] = React.useState(false);

  const router = useRouter();
  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const fieldValues = Object.fromEntries(formData.entries());
    console.log('fieldValues', fieldValues);
    const formIsValid = Object.entries(fieldValues).every(([name, value]) => {
      const valueToCheck =
        (typeof value === 'string' && value) ||
        (typeof value === 'object' && value.name);
      if (!valueToCheck) return 'Error';
      return !getFieldError(name as FormFieldName, valueToCheck);
    });
    console.log('formIsValid', formIsValid);
    setWasSubmitted(true);
    if (formIsValid) {
      try {
        console.log('email value', formData.get('email'));

        const response = await axios.post('/api/patients', formData);
        console.log('response', response);
        if (response.status === 201) {
          router.push('/');
        }
      } catch (error: any) {
        console.log('error.message', error.message);
        console.log('error.response.data', error.response?.data);
      }
      console.log(`Fast Form Submitted`, fieldValues);
    }
  }

  return (
    <form noValidate onSubmit={handleSubmit}>
      {formFields.map(({ name, type }) => (
        <Input key={name} name={name} type={type} wasSubmitted={wasSubmitted} />
      ))}
      <PhoneProvider>
        <PhoneInput
          name="phoneNumber"
          text="Phone Number"
          wasSubmitted={false}
        />
      </PhoneProvider>
      <button type="submit">Submit</button>
    </form>
  );
}

function WrappedForm() {
  const router = useRouter();
  return (
    <div>
      <hr />
      <h1>Fast Form</h1>
      <Form />
      <button className="text-black mt-5" onClick={() => router.push('/')}>
        Back
      </button>
    </div>
  );
}

export default WrappedForm;
