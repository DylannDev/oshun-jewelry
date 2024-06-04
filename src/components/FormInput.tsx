type FormInputProps = {
  label: string;
  inputType: string;
  inputName: string;
  placeholder: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FormInput = ({
  label,
  inputType,
  inputName,
  placeholder,
  onChange,
}: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-700 mb-2">{label}</label>
      <input
        type={inputType}
        name={inputName}
        placeholder={placeholder}
        className="ring-1 ring-gray-200 rounded-lg p-3 text-sm font-light placeholder:capitalize placeholder:text-xs placeholder:font-light"
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormInput;
