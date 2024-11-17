export enum MODE {
  LOGIN = "LOGIN",
  REGISTER = "REGISTER",
  RESET_PASSWORD = "RESET_PASSWORD",
  EMAIL_VERIFICATION = "EMAIL_VERIFICATION",
}

export const MODE_TITLES = {
  [MODE.LOGIN]: "Se Connecter",
  [MODE.REGISTER]: "Créer un compte",
  [MODE.RESET_PASSWORD]: "Réinitialiser le Mot de Passe",
  [MODE.EMAIL_VERIFICATION]: "Vérifiez votre Email",
};

export const BUTTON_TITLES = {
  [MODE.LOGIN]: "Connexion",
  [MODE.REGISTER]: "Créer un compte",
  [MODE.RESET_PASSWORD]: "Réinitialiser",
  [MODE.EMAIL_VERIFICATION]: "Vérifier",
};
