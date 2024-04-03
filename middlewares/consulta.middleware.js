import { Consulta } from '../models/consulta.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistConsulta = async (req, res, next) => {
  try {
    const { id } = req.params;

    const consulta = await Consulta.findOne({
      where: {
        id,
      },
    });

    if (!consulta) {
      return next(new AppError(`La consulta con el id: ${id} no existe`, 404));
    }

    req.consulta = consulta;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar la consulta: ${error.message}`, 500)
    );
  }
};
