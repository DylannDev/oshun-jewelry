"use client";

import { updateUser } from "@/lib/actions";
import SubmitForm from "./SubmitForm";
import Select from "react-select";
import countryList from "react-select-country-list";
import { useState, useMemo } from "react";
import InputField from "./InputField";
import { ContactDetailsFormProps, CountryOption } from "@/types";
import { ProfileFormFields } from "@/config/ProfileFormFieldsConfig";

const customStyles = {
  control: (provided: any, state: any) => ({
    ...provided,
    borderWidth: "1px",
    borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB", // blue-500 for focus, gray-300 otherwise
    borderRadius: "0.375rem",
    padding: "0.125rem",
    boxShadow: state.isFocused ? "0 0 0 1px #3B82F6" : "none", // blue-500 for focus
    "&:hover": {
      borderColor: state.isFocused ? "#3B82F6" : "#D1D5DB", // blue-500 for focus, gray-300 otherwise
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    backgroundColor: state.isSelected
      ? "#000"
      : state.isFocused
      ? "#E5E7EB"
      : "white", // blue-500 for selected, gray-100 for focus
    color: state.isSelected ? "white" : "black",
    "&:hover": {
      backgroundColor: state.isFocused ? "#E5E7EB" : "white", // gray-100 for focus
    },
  }),
  menu: (provided: any) => ({
    ...provided,
    borderRadius: "0.375rem",
    marginTop: "2px",
    zIndex: 9999,
  }),
  menuList: (provided: any) => ({
    ...provided,
    padding: 0,
  }),
};

const ContactDetailsForm = ({ user }: ContactDetailsFormProps) => {
  const options: CountryOption[] = useMemo(() => countryList().getData(), []);
  const [country, setCountry] = useState(
    user.member?.contact?.addresses?.[0]?.country || ""
  );

  const handleCountryChange = (selectedOption: CountryOption | null) => {
    setCountry(selectedOption?.value || "");
  };

  return (
    <form action={updateUser} className="mt-12 flex flex-col gap-4 w-full">
      <input
        type="text"
        hidden
        name="id"
        defaultValue={user.member?.contactId!}
      />

      {ProfileFormFields.map(({ label, name, required, getDefaultValue }) => (
        <InputField
          key={name}
          label={label}
          name={name}
          defaultValue={getDefaultValue(user)}
          required={required}
        />
      ))}

      <label htmlFor="country" className="text-sm text-gray-700">
        Pays
      </label>
      <Select
        id="country"
        name="country"
        options={options}
        value={options.find((option) => option.value === country)}
        onChange={handleCountryChange}
        styles={customStyles}
        required
      />

      <SubmitForm />
    </form>
  );
};

export default ContactDetailsForm;
