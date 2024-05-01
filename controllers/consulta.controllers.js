import { AppError } from '../utils/AppError.js';
import { Consulta } from '../models/consulta.model.js';
import { PlanTratamiento } from '../models/planTratamiento.model.js';

export const findAll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const consultas = await Consulta.findAll({
      where: {
        planTratamientoId: id,
      },
      order: [['id', 'ASC']],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas los tratamientos Dental',
      results: consultas.length,
      consultas,
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
    const { consulta } = req;

    return res.status(200).json({
      status: 'success',
      message: 'la consulta  se llamo exitosamente ',
      consulta,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar la consulta: ${error.message}`, 500)
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, descripcion, pago, consultorioId } = req.body;

    const planTratamiento = await PlanTratamiento.findOne({
      where: {
        id,
      },
    });
    const consulta = await Consulta.create({
      planTratamientoId: id,
      titulo,
      descripcion,
      pago,
      consultorioId,
    });

    await planTratamiento.update({
      deuda: planTratamiento.deuda - Number(pago),
    });

    return res.status(201).json({
      status: 'success',
      message: 'la consulta  se creó exitosamente',
      consulta,
    });
  } catch (error) {
    return next(
      new AppError(`Error al crear la consulta: ${error.message}`, 500)
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { consulta } = req;
    const { titulo, descripcion, pago } = req.body;

    await consulta.update({
      titulo,
      descripcion,
      pago,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos del consulta Dental se actualizaron exitosamente',
      consulta,
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
  const { consulta } = req;

  try {
    await consulta.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'El consulta se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar el tratamiento`, 500));
  }
};
