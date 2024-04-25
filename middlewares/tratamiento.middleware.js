import { Tratamiento } from '../models/tratamiento.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistTratamiento = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tratamiento = await Tratamiento.findOne({
      where: {
        id,
      },
    });

    if (!tratamiento) {
      return next(
        new AppError(`La tratamiento con el id: ${id} no existe`, 404)
      );
    }

    req.tratamiento = tratamiento;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar el tratamiento: ${error.message}`, 500)
    );
  }
};
