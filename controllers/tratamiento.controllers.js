import { AppError } from '../utils/AppError.js';
import { Tratamiento } from '../models/tratamiento.model.js';

export const findAll = async (req, res) => {
  try {
    const { id } = req.params;

    const tratamientos = await Tratamiento.findAll({
      where: { consultorioId: id },
      order: [['id', 'ASC']],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas los tratamientos Dental',
      results: tratamientos.length,
      tratamientos,
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
    const { tratamiento } = req;

    return res.status(200).json({
      status: 'success',
      message: 'el tratamiento  se llamo exitosamente ',
      tratamiento,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar a el tratamiento : ${error.message}`, 500)
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombre, precio, consultorioId } = req.body;

    const tratamiento = await Tratamiento.create({
      consultorioId: id,
      nombre,
      precio,
      consultorioId,
    });

    return res.status(201).json({
      status: 'success',
      message: 'El tratamiento  se creó exitosamente',
      tratamiento,
    });
  } catch (error) {
    return next(
      new AppError(`Error al crear el tratamiento : ${error.message}`, 500)
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { tratamiento } = req;
    const { nombre, precio } = req.body;

    await tratamiento.update({
      nombre,
      precio,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos del tratamiento  se actualizaron exitosamente',
      tratamiento,
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
  const { tratamiento } = req;

  try {
    await tratamiento.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'El tratamiento se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar el tratamiento`, 500));
  }
};
