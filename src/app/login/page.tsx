"use client";

import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import FormLink from "@/components/FormLink";
import useWixClient from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useState } from "react";
import { PiArrowLeftLight } from "react-icons/pi";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}
const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();

  const isLoggedIn = wixClient.auth.loggedIn();

  // Utiliser useEffect pour rediriger si l'utilisateur est déjà connecté
  useEffect(() => {
    if (isLoggedIn) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  const [mode, setMode] = useState(MODE.LOGIN);

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailCode, setEmailCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const formTitle =
    mode === MODE.LOGIN
      ? "Se Connecter"
      : mode === MODE.REGISTER
      ? "Créer un compte"
      : mode === MODE.RESET_PASSWORD
      ? "Réinitialiser le Mot de Passe"
      : "Vérifiez votre Email";

  const buttonTitle =
    mode === MODE.LOGIN
      ? "Connexion"
      : mode === MODE.REGISTER
      ? "Créer un compte"
      : mode === MODE.RESET_PASSWORD
      ? "Réinitialiser"
      : "Vérifier";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    let response;

    try {
      switch (mode) {
        case MODE.LOGIN:
          response = await wixClient.auth.login({
            email,
            password,
          });
          break;
        case MODE.REGISTER:
          response = await wixClient.auth.register({
            email,
            password,
            profile: { nickname: username },
          });
          break;
        case MODE.RESET_PASSWORD:
          setMessage("");
          response = await wixClient.auth.sendPasswordResetEmail(
            email,
            window.location.href
          );
          setMessage(
            "Vous allez recevoir un email pour réinitialiser votre mot de passe. Veuillez vérifier vos emails."
          );
          setMode(MODE.LOGIN);
          setMessage("Veuillez entrer votre nouveau mot de passe.");
          break;
        case MODE.EMAIL_VERIFICATION:
          response = await wixClient.auth.processVerification({
            verificationCode: emailCode,
          });
          break;
        default:
          break;
      }

      switch (response?.loginState) {
        case LoginState.SUCCESS:
          setMessage("Vous êtes bien connecté 🎉 ! Vous allez être redirigé.");
          const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
            response.data.sessionToken!
          );

          Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
            expires: 2,
          });
          wixClient.auth.setTokens(tokens);
          router.push("/");
          break;

        case LoginState.FAILURE:
          if (
            response.errorCode === "invalidEmail" ||
            response.errorCode === "invalidPassword"
          ) {
            setError("Email ou Mot de passe non valide.");
          } else if (response.errorCode === "emailAlreadyExists") {
            setError("Cet email est déjà utilisé !");
          } else if (response.errorCode === "resetPassword") {
            setError("Vous devez réinitialiser votre mot de passe.");
          } else {
            setError("Une erreur est survenue.");
          }

        case LoginState.EMAIL_VERIFICATION_REQUIRED:
          setMode(MODE.EMAIL_VERIFICATION);
        case LoginState.OWNER_APPROVAL_REQUIRED:
          setMessage("Vous devez vérifier votre email.");

        default:
          break;
      }
    } catch (err) {
      console.log(err);
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const resetMessages = () => {
    setMessage("");
    setError("");
  };
  return (
    <div className="h-[calc(100vh-80px)] flex items-center justify-center">
      <form
        className="flex flex-col gap-6 min-w-[350px]"
        onSubmit={handleSubmit}
      >
        <h1 className="text-2xl font-semibold">{formTitle}</h1>
        {mode === MODE.REGISTER ? (
          <FormInput
            label="Votre Nom"
            inputType="text"
            inputName="username"
            placeholder="Nom"
            onChange={(e) => setUsername(e.target.value)}
          />
        ) : null}
        {mode !== MODE.EMAIL_VERIFICATION ? (
          <FormInput
            label="Email"
            inputType="email"
            inputName="email"
            placeholder="Adresse email"
            onChange={(e) => setEmail(e.target.value)}
          />
        ) : (
          <FormInput
            label="Code de Vérification"
            inputType="text"
            inputName="emailCode"
            placeholder="Tapez votre code"
            onChange={(e) => setEmailCode(e.target.value)}
          />
        )}
        {mode === MODE.LOGIN || mode === MODE.REGISTER ? (
          <FormInput
            label="Mot de Passe"
            inputType="password"
            inputName="password"
            placeholder="Mot de passe"
            onChange={(e) => setPassword(e.target.value)}
          />
        ) : null}
        {mode === MODE.LOGIN && (
          <div
            className="text-xs text-center underline underline-offset-4 cursor-pointer"
            onClick={() => {
              setMode(MODE.RESET_PASSWORD);
              resetMessages();
            }}
          >
            Mot de passe oublié?
          </div>
        )}
        <Button button disabled={isLoading}>
          {isLoading ? "Chargement..." : buttonTitle}
        </Button>
        {error && (
          <div className="text-red-light text-sm text-center">{error}</div>
        )}
        {mode === MODE.LOGIN && (
          <FormLink
            onClick={() => {
              setMode(MODE.REGISTER);
              resetMessages();
            }}
          >
            Vous {"n'avez"} pas de compte?{" "}
            <span className="underline underline-offset-4">
              Créer un compte
            </span>
          </FormLink>
        )}
        {mode === MODE.REGISTER && (
          <FormLink
            onClick={() => {
              setMode(MODE.LOGIN);
              resetMessages();
            }}
          >
            Vous avez déjà un compte?{" "}
            <span className="underline underline-offset-4">Se connecter</span>
          </FormLink>
        )}
        {mode === MODE.RESET_PASSWORD && (
          <FormLink
            onClick={() => {
              setMode(MODE.LOGIN);
              resetMessages();
            }}
          >
            <span className="flex items-center justify-center gap-1 underline underline-offset-4">
              <PiArrowLeftLight /> Se connecter
            </span>
          </FormLink>
        )}
        {message && (
          <div className="text-green-600 text-sm text-center">{message}</div>
        )}
      </form>
    </div>
  );
};

export default LoginPage;
