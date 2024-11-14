import { members } from "@wix/members";

export type ContactDetailsFormProps = {
  user: members.GetMyMemberResponse &
    members.GetMyMemberResponseNonNullableFields;
};

export type CountryOption = {
  value: string;
  label: string;
};

export type SearchbarProps = {
  isVisible?: boolean;
  setIsVisible: (visible: boolean) => void;
};

export type Value = {
  icon: JSX.Element;
  title: string;
  description: string;
};