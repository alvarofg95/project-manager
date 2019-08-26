import jwt from 'jwt-simple';
import moment from 'moment';
import dotenv from 'dotenv';
dotenv.config();

export const createToken = user => {
  const payload = {
    sub: user._id,
    iat: moment().unix(),
    exp: moment()
      .add(14, 'days')
      .unix()
  };
  return jwt.encode(payload, process.env.TOKEN_SECRET || 'develop');
};

export const createSlug = (name, model) => {
  let finalName = name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/ñ/g, 'n')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u');
  let exists = true;
  do {
    const count = model.count({ slug: finalName });
    if (count === 0) {
      exists = false;
    } else {
      finalName = `${finalName}-${count}`;
    }
  } while (exists === true);

  return finalName;
};
