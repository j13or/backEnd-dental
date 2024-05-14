import { TipoSangre } from '../models/tipoSangre.mode.js';
import { AppError } from '../utils/AppError.js';

export const validExistTipoSangre = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tipoSangre = await TipoSangre.findOne({
      where: {
        id,
      },
    });

    if (!tipoSangre) {
      return next(
        new AppError(`La tipoSangre con el id: ${id} no existe`, 404)
      );
    }

    req.tipoSangre = tipoSangre;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar el tipoSangre: ${error.message}`, 500)
    );
  }
};
