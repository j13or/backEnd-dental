import { AppError } from '../utils/AppError.js';
import { Paciente } from '../models/paciente.model.js';
import { Op } from 'sequelize';

export const findAll = async (req, res, next) => {
  const { search } = req.query;
  try {
    let pacientes;

    if (!search) {
      pacientes = await Paciente.findAll({
        limit: 10,
        order: [['createdAt', 'DESC']],
      });
    } else {
      pacientes = await Paciente.findAll({
        where: {
          [Op.or]: [
            { apellidoPaterno: { [Op.iLike]: `%${search}%` } },
            { apellidoMaterno: { [Op.iLike]: `%${search}%` } },
            { nombres: { [Op.like]: `%${search}%` } },
            { carnet: { [Op.like]: `%${search}%` } },
          ],
        },
      });
    }

    return res.status(200).json({
      status: 'success',
      message: 'Todas los pacientes',
      results: pacientes.length,
      pacientes,
    });
  } catch (error) {
    return next(
      new AppError(
        `Error al llamar a todos las pacientes: ${error.message}`,
        500
      )
    );
  }
};

export const findOne = async (req, res) => {
  try {
    const { paciente } = req;

    return res.status(200).json({
      status: 'success',
      message: 'el paciente se llamo exitosamente ',
      paciente,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar al paciente: ${error.message}`, 500)
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const {
      carnet,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      genero,
      telefono,
      fechaDeNacimiento,
      alergia,
      tipoDeSangre,
    } = req.body;

    const paciente = await Paciente.create({
      carnet,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      genero,
      telefono,
      fechaDeNacimiento,
      alergia,
      tipoDeSangre,
    });
    console.log(paciente);

    return res.status(201).json({
      status: 'success',
      message: 'El paciente se creó exitosamente',
      paciente,
    });
  } catch (error) {
    return next(
      new AppError(`Error al crear al paciente: ${error.message}`, 500)
    );
  }
};

export const update = async (req, res, next) => {
  try {
    const { paciente } = req;
    const {
      carnet,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      genero,
      telefono,
      fechaDeNacimiento,
      alergia,
      tipoDeSangre,
    } = req.body;

    await paciente.update({
      carnet,
      nombres,
      apellidoPaterno,
      apellidoMaterno,
      genero,
      telefono,
      fechaDeNacimiento,
      alergia,
      tipoDeSangre,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos del paciente se actualizaron exitosamente',
      paciente,
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
  const { paciente } = req;

  try {
    await paciente.destroy();

    return res.status(200).json({
      status: 'success',
      message: 'El paciente se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar el paciente`, 500));
  }
};
