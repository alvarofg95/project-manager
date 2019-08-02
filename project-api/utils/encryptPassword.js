import passwordHash from 'password-hash';

export const encryptPassword = password => {
  const hash = passwordHash.generate(password);
  return hash;
};

export const comparePassword = (plainText, hash) => {
  return passwordHash.verify(plainText, hash);
};
