import { AppError } from '../utils/AppError.js';
import { TratamientoDental } from '../models/traramientoDental.model.js';

export const findAll = async (req, res) => {
  try {
    const tratamientosDental = await TratamientoDental.findAll({
      order: [['id', 'ASC']],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas los tratamientos Dental',
      results: tratamientosDental.length,
      tratamientosDental,
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
    const { tratamientoDental } = req;

    return res.status(200).json({
      status: 'success',
      message: 'el tratamiento Dental se llamo exitosamente ',
      tratamientoDental,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a el tratamiento Dental: ${error.message}`,
        500
      )
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { codigoDiente, tratamiento, precio, consultorioId } = req.body;

    const tratamientoDental = await TratamientoDental.create({
      consultaId: id,
      codigoDiente,
      tratamiento,
      precio,
      consultorioId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'El tratamiento Dental se creó exitosamente',
      tratamientoDental,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al crear el tratamiento Dental: ${error.message}`,
        500
      )
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { tratamientoDental } = req;
    const { codigoDiente, tratamiento, precio } = req.body;

    await consulta.update({
      codigoDiente,
      tratamiento,
      precio,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos del tratamiento Dental se actualizaron exitosamente',
      tratamientoDental,
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
  const { tratamientoDental } = req;

  try {
    await tratamientoDental.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'El tratamientoDental se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar el tratamiento`, 500));
  }
};
