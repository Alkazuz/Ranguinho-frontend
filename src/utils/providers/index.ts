import { FacebookAuthProvider, GoogleAuthProvider } from "firebase/auth";

export const providerFacebook = new FacebookAuthProvider();
export const providerGoogle = new GoogleAuthProvider();
providerGoogle.setCustomParameters({
  prompt: "select_account"
});
