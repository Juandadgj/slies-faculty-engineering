import jwt from 'jsonwebtoken';
import EnvModule from '../../../config/env/envModule';

EnvModule.configEnv();

// TODO: Actualizar el modelo de datos
export const createToken = (user, secret, expiresIn) => {
  const { _id, email, name, phone } = user;
  return jwt.sign(
    {
      _id,
      email,
      name,
      phone,
    },
    secret,
    { expiresIn },
  );
};

export const getUserFromToken = (req) => {
  const token = req.headers.authorization || null;
  if (token) {
    try {
      return jwt.verify(token, process.env.SECRET);
    } catch (error) {
      console.log(error);
    }
  }
};
