type FormInputProps = {
  label: string;
  inputType: string;
  inputName: string;
  placeholder: string;
  value: string; // Ajout de la propriété value
  onChange: React.ChangeEventHandler<HTMLInputElement>;
};

const FormInput = ({
  label,
  inputType,
  inputName,
  placeholder,
  value,
  onChange,
}: FormInputProps) => {
  return (
    <div className="flex flex-col">
      <label className="text-sm text-gray-700 mb-2">{label}</label>
      <input
        type={inputType}
        name={inputName}
        placeholder={placeholder}
        value={value} // Ajout de la propriété value
        className="ring-1 ring-gray-200 rounded-lg p-3 text-sm font-light placeholder:capitalize placeholder:text-[13px] placeholder:font-light"
        onChange={onChange}
        required
      />
    </div>
  );
};

export default FormInput;
