import { AppError } from '../utils/AppError.js';
import { PlanTratamiento } from '../models/planTratamiento.model.js';
import { PagosTratamiento } from '../models/pagosTratamiento.model.js';

export const findAll = async (req, res, next) => {
  try {
    const { id } = req.params;
    const pagosTratamiento = await PagosTratamiento.findAll({
      where: {
        planTratamientoId: id,
      },
      order: [['id', 'ASC']],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas los pagos del tratamiento',
      results: pagosTratamiento.length,
      pagosTratamiento,
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
    const { pagoTratamiento } = req;

    return res.status(200).json({
      status: 'success',
      message: ' pago  se llamo exitosamente ',
      pagoTratamiento,
    });
  } catch (error) {
    return next(new AppError(`Error al llamar la pago: ${error.message}`, 500));
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { titulo, fecha, pago, consultorioId } = req.body;

    const planTratamiento = await PlanTratamiento.findOne({
      where: {
        id,
      },
    });

    const pagoTratamiento = await PagosTratamiento.create({
      planTratamientoId: id,
      titulo,
      fecha,
      pago,
      consultorioId,
    });

    await planTratamiento.update({
      deuda: planTratamiento.deuda - Number(pago),
    });

    return res.status(201).json({
      status: 'success',
      message: 'el pago del Tratamiento  se creó exitosamente',
      pagoTratamiento,
    });
  } catch (error) {
    return next(
      new AppError(`Error al crear la consulta: ${error.message}`, 500)
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { pagoTratamiento } = req;
    const { titulo, fecha, pago } = req.body;

    await pagoTratamiento.update({
      titulo,
      fecha,
      pago,
    });

    return res.status(200).json({
      status: 'success',
      message:
        'Los datos del pagoTratamiento Dental se actualizaron exitosamente',
      pagoTratamiento,
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
  const { pagoTratamiento } = req;

  try {
    await pagoTratamiento.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'El pagoTratamiento se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar el tratamiento`, 500));
  }
};
