import { ContactDetailsFormProps } from "@/types";

type ProfileFormFields = {
  label: string;
  name: string;
  required?: boolean;
  getDefaultValue: (user: ContactDetailsFormProps["user"]) => string;
};

export const ProfileFormFields: ProfileFormFields[] = [
  {
    label: "First Name",
    name: "firstName",
    required: true,
    getDefaultValue: (user) => user.member?.contact?.firstName || "",
  },
  {
    label: "Surname",
    name: "lastName",
    required: true,
    getDefaultValue: (user) => user.member?.contact?.lastName || "",
  },
  {
    label: "Phone",
    name: "phone",
    required: true,
    getDefaultValue: (user) =>
      (user.member?.contact?.phones && user.member?.contact?.phones[0]) || "",
  },
  {
    label: "Adresse",
    name: "addressLine",
    required: true,
    getDefaultValue: (user) =>
      user.member?.contact?.addresses?.[0]?.addressLine || "",
  },
  {
    label: "Address Line 2",
    name: "addressLine2",
    required: false,
    getDefaultValue: (user) =>
      user.member?.contact?.addresses?.[0]?.addressLine2 || "",
  },
  {
    label: "Postal Code",
    name: "postalCode",
    required: true,
    getDefaultValue: (user) =>
      user.member?.contact?.addresses?.[0]?.postalCode || "",
  },
  {
    label: "City",
    name: "city",
    required: true,
    getDefaultValue: (user) => user.member?.contact?.addresses?.[0]?.city || "",
  },
];
