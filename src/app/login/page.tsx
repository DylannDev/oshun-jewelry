"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { PiArrowLeftLight } from "react-icons/pi";
import Button from "@/components/Button";
import FormInput from "@/components/FormInput";
import FormLink from "@/components/FormLink";
import useWixClient from "@/hooks/useWixClient";
import { LoginState } from "@wix/sdk";
import { useAuthStore } from "@/store/authStore";
import { BUTTON_TITLES, MODE, MODE_TITLES } from "@/constants/enums";
import { useCartStore } from "@/hooks/useCartStore";
import ProtectedRoute from "@/components/ProtectedRoute";

const LoginPage = () => {
  const wixClient = useWixClient();
  const router = useRouter();
  const { checkLoginStatus } = useAuthStore();
  const { getCart } = useCartStore();

  const [mode, setMode] = useState<MODE>(MODE.LOGIN);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    emailCode: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setMessage("");

    try {
      const response = await performAuthAction();
      handleAuthResponse(response);
    } catch (err) {
      console.error(err);
      setError("Une erreur est survenue.");
    } finally {
      setIsLoading(false);
    }
  };

  const performAuthAction = () => {
    const { email, password, username, emailCode } = formData;

    switch (mode) {
      case MODE.LOGIN:
        return wixClient.auth.login({ email, password });
      case MODE.REGISTER:
        return wixClient.auth.register({
          email,
          password,
          profile: { nickname: username },
        });
      case MODE.RESET_PASSWORD:
        return wixClient.auth.sendPasswordResetEmail(
          email,
          window.location.href
        );
      case MODE.EMAIL_VERIFICATION:
        return wixClient.auth.processVerification({
          verificationCode: emailCode,
        });
      default:
        throw new Error("Mode d'authentification inconnu");
    }
  };

  const handleAuthResponse = async (response: any) => {
    switch (response?.loginState) {
      case LoginState.SUCCESS:
        setMessage("Vous êtes bien connecté 🎉 ! Vous allez être redirigé.");
        const tokens = await wixClient.auth.getMemberTokensForDirectLogin(
          response.data.sessionToken!
        );
        wixClient.auth.setTokens(tokens);
        Cookies.set("refreshToken", JSON.stringify(tokens.refreshToken), {
          expires: 2,
        });
        getCart(wixClient);
        checkLoginStatus(wixClient);
        router.push("/");
        break;

      case LoginState.FAILURE:
        handleFailure(response.errorCode);
        break;

      case LoginState.EMAIL_VERIFICATION_REQUIRED:
        setMode(MODE.EMAIL_VERIFICATION);
        setMessage("Vous devez vérifier votre email.");
        break;

      case LoginState.OWNER_APPROVAL_REQUIRED:
        setMessage("Vous devez vérifier votre email.");
        break;

      default:
        setError("Une erreur est survenue.");
        break;
    }
  };

  const handleFailure = (errorCode: string) => {
    const errorMessages: Record<string, string> = {
      invalidEmail: "Email ou Mot de passe non valide.",
      invalidPassword: "Email ou Mot de passe non valide.",
      emailAlreadyExists: "Cet email est déjà utilisé !",
      resetPassword: "Vous devez réinitialiser votre mot de passe.",
    };
    setError(errorMessages[errorCode] || "Une erreur est survenue.");
  };

  const resetMessages = () => {
    setMessage("");
    setError("");
  };

  const renderFormInputs = () => {
    const { email, password, username, emailCode } = formData;

    switch (mode) {
      case MODE.REGISTER:
        return (
          <>
            <FormInput
              label="Votre Nom"
              inputType="text"
              inputName="username"
              placeholder="Nom"
              value={username}
              onChange={handleInputChange}
            />
            <FormInput
              label="Email"
              inputType="email"
              inputName="email"
              placeholder="Adresse email"
              value={email}
              onChange={handleInputChange}
            />
            <FormInput
              label="Mot de Passe"
              inputType="password"
              inputName="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handleInputChange}
            />
          </>
        );

      case MODE.RESET_PASSWORD:
        return (
          <FormInput
            label="Email"
            inputType="email"
            inputName="email"
            placeholder="Adresse email"
            value={email}
            onChange={handleInputChange}
          />
        );

      case MODE.EMAIL_VERIFICATION:
        return (
          <FormInput
            label="Code de Vérification"
            inputType="text"
            inputName="emailCode"
            placeholder="Tapez votre code"
            value={emailCode}
            onChange={handleInputChange}
          />
        );

      case MODE.LOGIN:
      default:
        return (
          <>
            <FormInput
              label="Email"
              inputType="email"
              inputName="email"
              placeholder="Adresse email"
              value={email}
              onChange={handleInputChange}
            />
            <FormInput
              label="Mot de Passe"
              inputType="password"
              inputName="password"
              placeholder="Mot de passe"
              value={password}
              onChange={handleInputChange}
            />
          </>
        );
    }
  };

  return (
    <ProtectedRoute requireAuth={false} redirectTo="/">
      <div className="flex-grow flex items-center justify-center w-full px-4">
        <form
          className="flex flex-col gap-6 w-full max-w-[500px]"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-semibold">{MODE_TITLES[mode]}</h1>
          <p>
            Connectez-vous pour accéder à l'historique de vos commandes et
            mettre à jour vos coordonnées.
          </p>
          {renderFormInputs()}
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
            {isLoading ? "Chargement..." : BUTTON_TITLES[mode]}
          </Button>
          {error && (
            <div className="text-red-light text-sm text-center">{error}</div>
          )}
          {message && (
            <div className="text-green-600 text-sm text-center">{message}</div>
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
        </form>
      </div>
    </ProtectedRoute>
  );
};

export default LoginPage;
