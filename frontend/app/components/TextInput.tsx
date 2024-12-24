const InputWithError = ({
  name,
  value,
  onChange,
  onBlur,
  errorMessage,
  displayErrorMessage,
  type = 'text',
}: {
  name: string;
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur: () => void;
  errorMessage: string | null;
  displayErrorMessage: boolean;
  type?: string;
}) => {
  return (
    <div>
      <input
        id={`${name}-input`}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        required
        aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
        className={`mt-1 block w-full px-3 py-2 border ${
          errorMessage ? 'border-red-500' : 'border-gray-300'
        } rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500`}
      />
      {displayErrorMessage ? (
        <span
          role="alert"
          id={`${name}-error`}
          className="text-red-500 text-sm mt-1"
        >
          {errorMessage}
        </span>
      ) : null}
    </div>
  );
};

export default InputWithError;
