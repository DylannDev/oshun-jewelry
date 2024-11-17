/* eslint-disable react/no-unescaped-entities */
import Button from "@/components/Button";
import { PiSmileyXEyes } from "react-icons/pi";

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center h-[calc(100dvh-80px)] w-full">
      <div className="flex flex-col items-center gap-6 text-center px-4">
        <PiSmileyXEyes className="text-red-500 text-5xl" />
        <h1 className="text-black text-3xl sm:text-4xl font-bold">
          404 - Page non trouvée.
        </h1>
        <p className="text-lg sm:text-xl mt-4">
          La page que vous recherchez semble ne pas exister.
        </p>
        <div className="flex flex-col sm:flex-row items-center gap-2">
          <Button href="/list?cat=all-products">Poursuivre mes achats</Button>
          <Button color="white" href="/">
            Retourner à l'accueil
          </Button>
        </div>
      </div>
    </div>
  );
}
