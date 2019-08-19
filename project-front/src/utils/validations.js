const validateEmail = email => {
  let valid = true;
  if (
    !email ||
    email === null ||
    email === undefined ||
    email === '' ||
    typeof email !== 'string'
  ) {
    valid = false;
  } else if (email.indexOf('@') === -1) {
    valid = false;
  }
  if (valid) {
    const domainPosition = email.lastIndexOf('.');
    const domain = email.substring(domainPosition);
    if (domain !== '.es' && domain !== '.com') {
      valid = false;
    }
  }
  return valid;
};

export { validateEmail };
