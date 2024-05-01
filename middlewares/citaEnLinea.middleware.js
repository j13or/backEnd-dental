import { CitaEnLinea } from '../models/citaEnLinea.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistCitaEnLinea = async (req, res, next) => {
  try {
    const { id } = req.params;

    const citaEnLinea = await CitaEnLinea.findOne({
      where: {
        id,
      },
    });

    if (!citaEnLinea) {
      return next(
        new AppError(`La cita En Linea con el id: ${id} no existe`, 404)
      );
    }

    req.citaEnLinea = citaEnLinea;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar la cita En Linea: ${error.message}`, 500)
    );
  }
};
