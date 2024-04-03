import { Cita } from '../models/cita.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistCita = async (req, res, next) => {
  try {
    const { id } = req.params;

    const cita = await Cita.findOne({
      where: {
        id,
      },
    });

    if (!cita) {
      return next(new AppError(`La cita con el id: ${id} no existe`, 404));
    }

    req.cita = cita;
    next();
  } catch (error) {
    return next(new AppError(`Error al buscar la cita: ${error.message}`, 500));
  }
};
