type InputFieldProps = {
  label?: string;
  name: string;
  defaultValue: string;
  required?: boolean;
};

const InputField = ({
  label,
  name,
  defaultValue,
  required,
}: InputFieldProps) => {
  return (
    <div className="flex flex-col">
      {label && (
        <label htmlFor={name} className="text-sm text-gray-700">
          {label}
        </label>
      )}
      <input
        type="text"
        id={name}
        name={name}
        defaultValue={defaultValue}
        className="ring-1 ring-gray-300 rounded-md p-2"
        required={required}
      />
    </div>
  );
};

export default InputField;
