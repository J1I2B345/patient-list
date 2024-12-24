const SubmitButton = ({
  children,
  isSubmitting,
}: {
  children: React.ReactNode;
  isSubmitting: boolean;
}) => {
  return (
    <button
      type="submit"
      className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md ${
        isSubmitting ? 'opacity-50' : 'hover:bg-blue-700'
      }`}
      disabled={isSubmitting}
    >
      {children}
    </button>
  );
};

const SecondaryButton = ({
  children,
  loading,
  onClick,
}: {
  children: React.ReactNode;
  loading: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className={`w-full px-4 py-2 bg-gray-200 text-gray-800 rounded-md ${
        loading ? 'opacity-50' : 'hover:bg-gray-300'
      }`}
      disabled={loading}
    >
      {children}
    </button>
  );
};

interface PrimaryButtonProps {
  className?: string;
  loading?: boolean;
  onClick?: () => void;
  text?: string;
  children?: React.ReactNode;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  className = '',
  loading = false,
  onClick,
  text,
  children,
}) => {
  return (
    <button
      type="button"
      className={`w-full px-4 py-2 bg-blue-600 text-white rounded-md ${
        loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
      } ${className}`}
      onClick={loading ? undefined : onClick}
      disabled={loading}
    >
      {loading ? 'Loading...' : text || children}
    </button>
  );
};

export { SecondaryButton, SubmitButton, PrimaryButton };
