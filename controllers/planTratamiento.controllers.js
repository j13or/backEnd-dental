import { AppError } from '../utils/AppError.js';
import { TratamientoDental } from '../models/traramientoDental.model.js';
import { Paciente } from '../models/paciente.model.js';
import { Op, Sequelize } from 'sequelize'; // Asegúrate de importar Sequelize
import { PlanTratamiento } from '../models/planTratamiento.model.js';

export const findAll = async (req, res, next) => {
  const { date, mes, año } = req.query;
  const { id } = req.params;

  try {
    let whereCondition = {};

    if (!mes && !año && !date) {
      // Si se proporcionan ambos parámetros 'mes' y 'año', filtramos por mes y año
      whereCondition = {};
    } else if (mes && año) {
      // Si se proporcionan ambos parámetros 'mes' y 'año', filtramos por mes y año
      whereCondition = Sequelize.literal(
        `EXTRACT(MONTH FROM "planTratamiento"."createdAt") = ${mes} AND EXTRACT(YEAR FROM "planTratamiento"."createdAt") = ${año}`
      );
    } else if (date) {
      // Si se proporciona el parámetro 'date', filtramos por esa fecha específica
      whereCondition = Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('planTratamiento.createdAt')),
        '=',
        date
      );
    }

    const planTratamientos = await PlanTratamiento.findAll({
      where: { whereCondition, consultorioId: id },

      order: [['id', 'DESC']],
      include: [
        {
          model: Paciente,
        },
        { model: TratamientoDental },
      ],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas las planTratamientos',
      results: planTratamientos.length,
      planTratamientos,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a todas las planTratamiento: ${error.message}`,
        500
      )
    );
  }
};

export const findAllPlanTratamientosId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const planTratamiento = await PlanTratamiento.findAll({
      where: {
        consultorioId: id,
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas las planTratamiento',
      results: planTratamiento.length,
      planTratamiento,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a todas las PlanTratamientos: ${error.message}`,
        500
      )
    );
  }
};

export const findAllPacienteId = async (req, res, next) => {
  const { paciente } = req;
  try {
    const planTratamiento = await PlanTratamiento.findAll({
      where: {
        pacienteId: paciente.id,
      },
      order: [['id', 'DESC']],
      include: [{ model: TratamientoDental }],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas las planTratamiento',
      results: planTratamiento.length,
      planTratamiento,
      paciente,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a todas las PlanTratamientos: ${error.message}`,
        500
      )
    );
  }
};

export const findOne = async (req, res) => {
  try {
    const { planTratamiento } = req;

    return res.status(200).json({
      status: 'success',
      message: 'la planTratamiento se llamo exitosamente ',
      planTratamiento,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a la planTratamiento: ${error.message}`,
        500
      )
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, tratamientosDental, consultorioId } = req.body;

    const dataJson = JSON.parse(data);
    const tratamientoDentalJson = JSON.parse(tratamientosDental);

    const file = req.file;
    const fileName = file.filename;

    const host = req.get('host');
    const protocol = req.protocol;

    const linkFile = `${protocol}://${host}/api/v1/upload/${fileName}`;

    const montoTotal = Number(dataJson.montoTotal);
    const acuenta = Number(dataJson.acuenta);
    const deuda = montoTotal - acuenta;

    const planTratamiento = await PlanTratamiento.create({
      pacienteId: id,
      titulo: dataJson.titulo,
      observaciones: dataJson.observaciones,
      montoTotal,
      acuenta,
      deuda,
      consultorioId,
      linkFile,
    });

    // Crear un array de promesas para la creación de tratamientos dentales
    const promises = tratamientoDentalJson.map((tratamientoDental) => {
      return TratamientoDental.create({
        planTratamientoId: planTratamiento.id,
        codigoDiente: tratamientoDental.codigoDiente,
        tratamiento: tratamientoDental.tratamiento,
        precio: tratamientoDental.precio,
        consultorioId,
      });
    });

    // Esperar a que todas las promesas se resuelvan
    await Promise.all(promises);

    return res.status(201).json({
      status: 'success',
      message: 'La planTratamiento se creó exitosamente',
      planTratamiento,
    });
  } catch (error) {
    return next(
      new AppError(`Error al crear la planTratamiento: ${error.message}`, 500)
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { planTratamiento } = req;
    const { titulo, observaciones, montoTotal, acuenta, deuda } = req.body;

    await planTratamiento.update({
      titulo,
      observaciones,
      montoTotal,
      acuenta,
      deuda,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos de la planTratamiento se actualizaron exitosamente',
      planTratamiento,
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
  const { planTratamiento } = req;

  try {
    await planTratamiento.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'La planTratamiento se  elimino exitosamente',
    });
  } catch (error) {
    return next(
      new AppError(`Hubo un error al eliminar la planTratamiento`, 500)
    );
  }
};
