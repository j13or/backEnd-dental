import { AppError } from '../utils/AppError.js';
import { CitaEnLinea } from '../models/citaEnLinea.model.js';

export const findAll = async (req, res, next) => {
  try {
    const { id } = req.params;

    const citasEnLinea = await CitaEnLinea.findAll({
      where: { consultorioId: id, estado: ['activo', 'confirmar'] }, // Cambié la condición para buscar 'activo' o 'confirmar'
      order: [['id', 'ASC']],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas los citasEnLinea Dental',
      results: citasEnLinea.length,
      citasEnLinea,
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
    const { citaEnLinea } = req;

    return res.status(200).json({
      status: 'success',
      message: 'el citaEnLinea  se llamo exitosamente ',
      citaEnLinea,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a  la cita en linea : ${error.message}`,
        500
      )
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombresApellidos, correo, telefono, fecha, comentario, estado } =
      req.body;

    const citaEnLinea = await CitaEnLinea.create({
      consultorioId: id,
      nombresApellidos,
      correo,
      telefono,
      fecha,
      comentario,
      estado,
    });

    return res.status(201).json({
      status: 'success',
      message: 'El citaEnLinea  se creó exitosamente',
      citaEnLinea,
    });
  } catch (error) {
    return next(
      new AppError(`Error al crear el citaEnLinea : ${error.message}`, 500)
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { citaEnLinea } = req;
    const { nombresApellidos, correo, telefono, fecha, comentario, estado } =
      req.body;

    await citaEnLinea.update({
      nombresApellidos,
      correo,
      telefono,
      fecha,
      comentario,
      estado,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos de la cita En Linea  se actualizaron exitosamente',
      citaEnLinea,
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
  const { citaEnLinea } = req;

  try {
    await citaEnLinea.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'El citaEnLinea se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar el citaEnLinea`, 500));
  }
};
