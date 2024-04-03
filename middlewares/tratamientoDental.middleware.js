import { TratamientoDental } from '../models/traramientoDental.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistTratamientoDental = async (req, res, next) => {
  try {
    const { id } = req.params;

    const tratamientoDental = await TratamientoDental.findOne({
      where: {
        id,
      },
    });

    if (!tratamientoDental) {
      return next(
        new AppError(`El tratamiento Dental con el id: ${id} no existe`, 404)
      );
    }

    req.tratamientoDental = tratamientoDental;
    next();
  } catch (error) {
    return next(
      new AppError(
        `Error al buscar el  tratamiento Dental: ${error.message}`,
        500
      )
    );
  }
};
