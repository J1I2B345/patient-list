import React from 'react';
import { isMobilePhone } from 'validator';
import ReactFlagsSelect from 'react-flags-select';
import { CountryCode, getCountryCallingCode } from 'libphonenumber-js';

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
  const [countryCode, setRawCountryCode] = React.useState('+1'); // Default countryCode
  const [flag, setFlag] = React.useState('US'); // Default countryCode
  const [phoneNumber, setRawPhoneNumber] = React.useState('+1');

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
  const { countryCode: code, phoneNumber, flag } = usePhone();
  const { setCountryCode, setPhoneNumber, setFlag } = useSetPhone();

  const [touched, setTouched] = React.useState(false);
  const isValidMobilePhone = isMobilePhone(phoneNumber.replace('+', ''));
  console.log('isValidMobilePhone', isValidMobilePhone);
  const errorMessage = !isValidMobilePhone
    ? 'Please insert a valid mobile phone number e.g 5491122334455'
    : null;
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;

  return (
    <div key={name} className="flex flex-col">
      <label htmlFor={`${name}-countryCode`}>Country Code:</label>{' '}
      <input
        id="Country Code"
        name="Country Code"
        type="text"
        value={code}
        disabled
        required
      />
      <ReactFlagsSelect
        selected={flag}
        onSelect={(flag) => {
          console.log('flag', flag);
          const countryCode = getCountryCallingCode(flag as CountryCode);
          setFlag(flag);
          setCountryCode(countryCode);
        }}
      />
      <label htmlFor={`${name}-input`}>{text}:</label>{' '}
      <input
        id={`${name}-input`}
        name={name}
        type="text"
        value={phoneNumber} // Display without the countryCode
        onChange={(event) => setPhoneNumber(event.currentTarget.value)}
        onBlur={() => setTouched(true)}
        pattern="[0-9]{3,15}" // Example validation
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

export { PhoneProvider, PhoneInput };
