import { Consultorio } from '../models/consultorio.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistConsultorio = async (req, res, next) => {
  try {
    const { id } = req.params;

    const consultorio = await Consultorio.findOne({
      where: {
        id,
      },
    });

    if (!consultorio) {
      return next(
        new AppError(`La consultorio con el id: ${id} no existe`, 404)
      );
    }

    req.consultorio = consultorio;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar el consultorio: ${error.message}`, 500)
    );
  }
};
