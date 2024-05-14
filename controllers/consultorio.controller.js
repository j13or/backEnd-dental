import { Consultorio } from '../models/consultorio.model.js';
import { Usuario } from '../models/usuario.model.js';
import { AppError } from '../utils/AppError.js';

export const findAll = async (req, res, next) => {
  try {
    const consultorios = await Consultorio.findAll({
      order: [['id', 'ASC']],
      include: [
        {
          model: Usuario,
        },
      ],
    });

    return res.status(200).json({
      status: 'success',
      results: consultorios.length,
      consultorios,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a todos los conultorios: ${error.message}`,
        500
      )
    );
  }
};

export const findOne = async (req, res, next) => {
  try {
    const { consultorio } = req;

    return res.status(200).json({
      status: 'success',
      consultorio,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar al  consultorio: ${error.message}`, 500)
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { nombreConsultorio, direccion, telefono, linkGoogleMaps } = req.body;

    const consultorio = await Consultorio.create({
      nombreConsultorio,
      direccion,
      telefono,
      linkGoogleMaps,
    });

    return res.status(201).json({
      status: 'success',
      message: 'El consultorio se creó exitosamente',
      consultorio,
    });
  } catch (error) {
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message);
      return next(new AppError(`Datos inválidos: ${errors.join(', ')}`, 400));
    }
    return next(
      new AppError(`Error al crear el consultorio: ${error.message}`, 500)
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { consultorio } = req;
    const { nombreConsultorio, direccion, telefono, linkGoogleMaps } = req.body;

    await consultorio.update({
      nombreConsultorio,
      direccion,
      telefono,
      linkGoogleMaps,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos del consultorio se actualizaron exitosamente',
      consultorio,
    });
  } catch (error) {
    return next(
      new AppError(
        `Hubo un error al actualizar sus datos: ${error.message}`,
        500
      )
    );
  }
};

export const deleteElement = async (req, res, next) => {
  const { consultorio } = req;

  try {
    await consultorio.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'El consulltorio ha sido eliminado exitosamente',
    });
  } catch (error) {
    // Manejo de errores
    return next(
      new AppError(
        `Hubo un error al eliminar el consultorio con el ID ${consultorio.id}: ${error.message}`,
        500
      )
    );
  }
};
