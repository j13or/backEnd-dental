import { AppError } from '../utils/AppError.js';
import { TipoSangre } from '../models/tipoSangre.mode.js';

export const findAll = async (req, res) => {
  try {
    const { id } = req.params;

    const tiposSangre = await TipoSangre.findAll({
      where: { consultorioId: id },
      order: [['id', 'ASC']],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas los tipos deSangre Dental',
      results: tiposSangre.length,
      tiposSangre,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a todas las consultas: ${error.message}`,
        500
      )
    );
  }
};

export const findOne = async (req, res) => {
  try {
    const { tipoSangre } = req;

    return res.status(200).json({
      status: 'success',
      message: 'el tipoSangre  se llamo exitosamente ',
      tipoSangre,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar a el tipoSangre : ${error.message}`, 500)
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, consultorioId } = req.body;

    const tipoSangre = await TipoSangre.create({
      consultorioId: id,
      nombre,
      consultorioId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'El tipoSangre  se creó exitosamente',
      tipoSangre,
    });
  } catch (error) {
    return next(
      new AppError(`Error al crear el tipoSangre : ${error.message}`, 500)
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { tipoSangre } = req;
    const { nombre } = req.body;

    await tipoSangre.update({
      nombre,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos del tipoSangre  se actualizaron exitosamente',
      tipoSangre,
    });
  } catch (error) {
    // Manejo de errores
    return next(
      new AppError(
        `Hubo un error al actualizar sus datos: ${error.message}`,
        500
      )
    );
  }
};

export const deleteElement = async (req, res, next) => {
  const { tipoSangre } = req;

  try {
    await tipoSangre.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'El tipoSangre se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar el tipoSangre`, 500));
  }
};
