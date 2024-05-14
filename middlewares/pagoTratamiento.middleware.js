import { PagosTratamiento } from '../models/pagosTratamiento.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistPagosTratamiento = async (req, res, next) => {
  try {
    const { id } = req.params;

    const pagoTratamiento = await PagosTratamiento.findOne({
      where: {
        id,
      },
    });

    if (!pagoTratamiento) {
      return next(
        new AppError(`La pagoTratamiento con el id: ${id} no existe`, 404)
      );
    }

    req.pagoTratamiento = pagoTratamiento;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar la pagoTratamiento: ${error.message}`, 500)
    );
  }
};
