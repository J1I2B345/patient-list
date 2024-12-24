import React from 'react';
import ReactFlagsSelect from 'react-flags-select';
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';
import { validateMobilePhone } from '../../utils/validations';
import InputWithError from '../TextInput';

const PhoneContext = React.createContext<{
  countryCode: string;
  flag: string;
  phoneNumber: string;
} | null>(null);

const SetPhoneContext = React.createContext<{
  setCountryCode: (code: string) => void;
  setFlag: (flag: string) => void;
  setPhoneNumber: (number: string) => void;
} | null>(null);

function PhoneProvider({ children }: { children: React.ReactNode }) {
  const [countryCode, setRawCountryCode] = React.useState('1');
  const [flag, setFlag] = React.useState('US');
  const [phoneNumber, setRawPhoneNumber] = React.useState('1');

  const setPhoneNumber = (number: string) => {
    // Ensure phoneNumber always includes countryCode
    if (!number || number.length < countryCode.length) {
      setRawPhoneNumber(countryCode);
    } else {
      setRawPhoneNumber(number);
    }
  };

  const setCountryCode = (newCountryCode: string) => {
    const oldCountryCode = countryCode;
    setRawCountryCode(newCountryCode);
    setPhoneNumber(phoneNumber.replace(oldCountryCode, newCountryCode));
  };

  return (
    <PhoneContext.Provider value={{ countryCode, flag, phoneNumber }}>
      <SetPhoneContext.Provider
        value={{ setCountryCode, setPhoneNumber, setFlag }}
      >
        {children}
      </SetPhoneContext.Provider>
    </PhoneContext.Provider>
  );
}

function usePhone() {
  const phoneContext = React.useContext(PhoneContext);
  if (phoneContext === null) {
    throw new Error('usePhone must be used in a descendant of PhoneProvider');
  }
  return phoneContext;
}

function useSetPhone() {
  const setPhoneContext = React.useContext(SetPhoneContext);
  if (setPhoneContext === null) {
    throw new Error(
      'useSetPhone must be used in a descendant of PhoneProvider'
    );
  }
  return setPhoneContext;
}

function PhoneInput({
  name,
  text,
  wasSubmitted,
}: {
  name: string;
  text: string;
  wasSubmitted: boolean;
}) {
  const { phoneNumber, flag } = usePhone();
  const { setCountryCode, setPhoneNumber, setFlag } = useSetPhone();

  const [touched, setTouched] = React.useState(false);
  const isValidMobilePhone = validateMobilePhone(phoneNumber);
  const errorMessage = !isValidMobilePhone
    ? 'Please insert a valid mobile phone number e.g 5491122334455'
    : null;
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  return (
    <div key={name} className="mb-4">
      <label
        className="block font-medium text-gray-700"
        htmlFor={`${name}-countryCode`}
      >
        Country Code:
      </label>
      <ReactFlagsSelect
        selected={flag}
        onSelect={(flag) => {
          const countryCode = getCountryCallingCode(flag as CountryCode);
          setFlag(flag);
          setCountryCode(countryCode);
        }}
      />
      <label
        htmlFor={`${name}-input`}
        className="block font-medium text-gray-700"
      >
        {text}:
      </label>

      <InputWithError
        name={name}
        value={phoneNumber}
        onChange={(event) => setPhoneNumber(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        errorMessage={errorMessage}
        displayErrorMessage={!!displayErrorMessage}
      />
    </div>
  );
}

export { PhoneProvider, PhoneInput };
