export function handleFirebaseError(err) {
  let errorCode = err.code;
  let errorMessage = "Ocorreu um erro, tente novamente!";
  console.log(errorCode)
  if (errorCode == "auth/email-already-in-use") {
    errorMessage = "O email informado já está registrado."
  }else if (errorCode == "auth/email-already-exists") {
    errorMessage = "O email informado já está registrado."
  }else if (errorCode == "auth/invalid-password") {
    errorMessage = "A senha informada é inválida."
  }else if (errorCode == "auth/user-not-found") {
    errorMessage = "O email informado não está registrado."
  }else if (errorCode == "auth/wrong-password") {
    errorMessage = "Email ou senha incorretos"
  }

  return errorMessage;
}