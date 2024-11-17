"use client";

import { useRouter } from "next/navigation";
import Button from "./Button";

type LoginButtonProps = {
  closeMenu: () => void;
};

const LoginButton = ({ closeMenu }: LoginButtonProps) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-4 w-full min-[900px]:max-w-[300px] text-center">
      <h2 className="text-lg font-medium">Mon compte</h2>
      <p className="text-sm text-gray-500">
        Connectez-vous à votre compte pour passer votre commande.
      </p>
      <Button
        color="white"
        onClick={() => {
          closeMenu();
          router.push("/login");
        }}
        href="/login"
        button
      >
        Se connecter
      </Button>
    </div>
  );
};

export default LoginButton;
