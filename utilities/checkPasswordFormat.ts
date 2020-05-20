//   To check a password between 7 to 15 characters which contain at least one numeric digit and a special character
export const checkPasswordFormat = (password: string) => {
  //   var paswd = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  var paswd = /^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{7,15}$/;
  if (password.match(paswd)) {
    return true;
  } else {
    return false;
  }
};
