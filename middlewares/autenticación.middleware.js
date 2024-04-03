import { AppError } from '../utils/AppError.js';
import { promisify } from 'util';
import jwt from 'jsonwebtoken';
import { Usuario } from '../models/usuario.model.js';

export const proteger = async (req, res, next) => {
  try {
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
      return next(
        new AppError(
          '¡No has iniciado sesión! Por favor inicia sesión para obtener acceso',
          401
        )
      );
    }

    const decoded = await promisify(jwt.verify)(
      token,
      process.env.SECRET_JWT_SEED
    );

    const usuario = await Usuario.findOne({
      where: {
        id: decoded.id,
      },
    });

    if (!usuario) {
      return next(
        new AppError('El propietario de este token ya no está disponible', 401)
      );
    }

    req.sessionUser = usuario;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al proteger al usuario: ${error.message}`, 500)
    );
  }
};

export const protegerPropietarioCuenta = async (req, res, next) => {
  try {
    const { user, sessionUser } = req;

    if (user.id !== sessionUser.id) {
      return next(new AppError('No eres el propietario de esta cuenta.', 401));
    }

    next();
  } catch (error) {
    return next(
      new AppError(
        `Error al proteger al propietario de la cuenta: ${error.message}`,
        500
      )
    );
  }
};

export const restringirRol = (...roles) => {
  return (req, res, next) => {
    try {
      const { role } = req.sessionUser;

      if (!roles.includes(role)) {
        return next(
          new AppError('¡No tienes permiso para realizar esta acción!', 403)
        );
      }

      next();
    } catch (error) {
      return next(
        new AppError(`Error al restringir a los roles: ${error.message}`, 500)
      );
    }
  };
};
