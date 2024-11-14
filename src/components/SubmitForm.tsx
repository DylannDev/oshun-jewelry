"use client";

import { useFormStatus } from "react-dom";
import Button from "./Button";

const SubmitForm = () => {
  const { pending } = useFormStatus();
  return (
    <Button disabled={pending} button>
      {pending ? "Mise à jour..." : "Mettre à jour"}
    </Button>
  );
};

export default SubmitForm;
