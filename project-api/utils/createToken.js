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

export const createSlug = name => {
  const finalName = name
    .toLowerCase()
    .replace(/ /g, '-')
    .replace(/ñ/g, 'n')
    .replace(/á/g, 'a')
    .replace(/é/g, 'e')
    .replace(/í/g, 'i')
    .replace(/ó/g, 'o')
    .replace(/ú/g, 'u');
  return finalName;
};
