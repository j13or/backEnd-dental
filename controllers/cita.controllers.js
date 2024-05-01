import { AppError } from '../utils/AppError.js';
import { Cita } from '../models/cita.model.js';
import { Paciente } from '../models/paciente.model.js';

export const findAll = async (req, res, next) => {
  const { fecha } = req.query;
  const { id } = req.params;

  try {
    let whereCondition = {};

    if (fecha) {
      whereCondition = { fecha, consultorioId: id };
    } else {
      whereCondition = { consultorioId: id };
    }

    const citas = await Cita.findAll({
      where: whereCondition,

      order: [['id', 'ASC']],
      include: [
        {
          model: Paciente,
        },
      ],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas las citas',
      results: citas.length,
      citas,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar a todas las citas: ${error.message}`, 500)
    );
  }
};
export const findAllPacienteId = async (req, res, next) => {
  const { paciente } = req;
  try {
    const citas = await Cita.findAll({
      where: {
        pacienteId: paciente.id,
      },
      order: [['id', 'DESC']],
    });

    await Promise.all(
      citas.map(async (cita) => {
        const fechaActualPeru = new Date();
        fechaActualPeru.setHours(fechaActualPeru.getHours() - 5); // Ajuste de la diferencia horaria
        const fechaCita = new Date(cita.fecha);
        if (fechaCita < fechaActualPeru) {
          await cita.update({
            estado: 'pasado',
          });
        } else {
          await cita.update({
            estado: 'activo',
          });
        }
      })
    );

    return res.status(200).json({
      status: 'success',
      message: 'Todas las citas',
      results: citas.length,
      citas,
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
    const { cita } = req;

    return res.status(200).json({
      status: 'success',
      message: 'la cita se llamo exitosamente ',
      cita,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar a la cita: ${error.message}`, 500)
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { descripcion, fecha, titulo, consultorioId } = req.body;

    const cita = await Cita.create({
      pacienteId: id,
      consultorioId,
      descripcion,
      fecha,
      titulo,
    });

    return res.status(201).json({
      status: 'success',
      message: 'El cita se creó exitosamente',
      cita,
    });
  } catch (error) {
    return next(new AppError(`Error al crear la cita: ${error.message}`, 500));
  }
};

export const update = async (req, res, next) => {
  try {
    const { cita } = req;
    const { descripcion, fecha, titulo } = req.body;

    // Actualizar los datos de la cita
    await cita.update({
      descripcion,
      fecha,
      titulo,
    });

    // Responder con los datos actualizados de la cita
    return res.status(200).json({
      status: 'success',
      message: 'Los datos de la cita se actualizaron exitosamente',
      cita,
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
  const { cita } = req;

  try {
    await cita.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'La cita se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar la cita`, 500));
  }
};
