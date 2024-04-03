import { Usuario } from '../models/usuario.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistUsuario = async (req, res, next) => {
  try {
    const { id } = req.params;

    const usuario = await Usuario.findOne({
      where: {
        id,
      },
    });

    if (!usuario) {
      return next(new AppError(`El usuario con el id: ${id} no existe`, 404));
    }

    req.usuario = usuario;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar el usuario: ${error.message}`, 500)
    );
  }
};
