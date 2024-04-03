import { Paciente } from '../models/paciente.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistPaciente = async (req, res, next) => {
  try {
    const { id } = req.params;

    const paciente = await Paciente.findOne({
      where: {
        id,
      },
    });

    if (!paciente) {
      return next(new AppError(`El paciente con el id: ${id} no existe`, 404));
    }

    req.paciente = paciente;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar el paciente: ${error.message}`, 500)
    );
  }
};
