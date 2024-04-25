import { AppError } from '../utils/AppError.js';
import { Consulta } from '../models/consulta.model.js';
import { TratamientoDental } from '../models/traramientoDental.model.js';
import { Paciente } from '../models/paciente.model.js';
import { Op, Sequelize } from 'sequelize'; // Asegúrate de importar Sequelize
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../utils/firebase.js';

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
        `EXTRACT(MONTH FROM "consulta"."createdAt") = ${mes} AND EXTRACT(YEAR FROM "consulta"."createdAt") = ${año}`
      );
    } else if (date) {
      // Si se proporciona el parámetro 'date', filtramos por esa fecha específica
      whereCondition = Sequelize.where(
        Sequelize.fn('DATE', Sequelize.col('consulta.createdAt')),
        '=',
        date
      );
    }

    const consultas = await Consulta.findAll({
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
      message: 'Todas las consultas',
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

export const findAllConsultasId = async (req, res, next) => {
  const { id } = req.params;
  try {
    const consultas = await Consulta.findAll({
      where: {
        consultorioId: id,
      },
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas las consultas',
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

export const findAllPacienteId = async (req, res, next) => {
  const { paciente } = req;
  try {
    const consultas = await Consulta.findAll({
      where: {
        pacienteId: paciente.id,
      },
      order: [['id', 'DESC']],
      include: [{ model: TratamientoDental }],
    });

    return res.status(200).json({
      status: 'success',
      message: 'Todas las consultas',
      results: consultas.length,
      consultas,
      paciente,
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
      message: 'la consulta se llamo exitosamente ',
      consulta,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar a la consulta: ${error.message}`, 500)
    );
  }
};

export const create = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { data, tratamientosDental, consultorioId } = req.body;

    const dataJson = JSON.parse(data);
    const tratamientoDentalJson = JSON.parse(tratamientosDental);

    const fileRef = ref(
      storage,
      `linkFile/${Date.now()}-${req.file.originalname}`
    );

    await uploadBytes(fileRef, req.file.buffer);

    const fileUploaded = await getDownloadURL(fileRef);

    const consulta = await Consulta.create({
      pacienteId: id,
      titulo: dataJson.titulo,
      descripcion: dataJson.descripcion,
      montoTotal: dataJson.montoTotal,
      adelantoPago: dataJson.adelantoPago,
      consultorioId,
      linkFile: fileUploaded,
    });

    // Crear un array de promesas para la creación de tratamientos dentales
    const promises = tratamientoDentalJson.map((tratamientoDental) => {
      return TratamientoDental.create({
        consultaId: consulta.id,
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
      message: 'La consulta se creó exitosamente',
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
    const { titulo, descripcion, montoTotal, adelantoPago } = req.body;

    await consulta.update({
      titulo,
      descripcion,
      montoTotal,
      adelantoPago,
    });

    return res.status(200).json({
      status: 'success',
      message: 'Los datos de la consulta se actualizaron exitosamente',
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
      message: 'La consulta se  elimino exitosamente',
    });
  } catch (error) {
    return next(new AppError(`Hubo un error al eliminar la consulta`, 500));
  }
};
