import { AppError } from '../utils/AppError.js';
import { Usuario } from '../models/usuario.model.js';
import bcrypt from 'bcryptjs';
import { generateJWT } from '../utils/jwt.js';
import { Consultorio } from '../models/consultorio.model.js';

export const findAll = async (req, res, next) => {
  try {
    const usuarios = await Usuario.findAll({
      order: [['id', 'ASC']],
      include: [{ model: Consultorio }],
    });

    return res.status(200).json({
      status: 'success',
      results: usuarios.length,
      usuarios,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar a todos los usuario: ${error.message}`, 500)
    );
  }
};

export const findAllConsultorio = async (req, res, next) => {
  try {
    const { id } = req.params;
    const usuarios = await Usuario.findAll({
      where: { consultorioId: id },
      order: [['id', 'ASC']],
      include: [{ model: Consultorio }],
    });

    return res.status(200).json({
      status: 'success',
      results: usuarios.length,
      usuarios,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar a todos los usuario: ${error.message}`, 500)
    );
  }
};

export const findOne = async (req, res, next) => {
  try {
    const { usuario } = req;

    return res.status(200).json({
      status: 'success',
      usuario,
    });
  } catch (error) {
    return next(
      new AppError(`Error al llamar al  usuario: ${error.message}`, 500)
    );
  }
};

export const signup = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { nombres, apellidos, email, contraseña, rol, telefono } = req.body;

    // Generación del hash de la contraseña
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    // Creación del usuario en la base de datos
    let usuario;
    if (rol === 'SuperAdmin') {
      usuario = await Usuario.create({
        consultorioId: null,
        nombres,
        apellidos,
        email,
        rol,
        telefono,
        contraseña: hashedPassword,
      });
    } else {
      usuario = await Usuario.create({
        consultorioId: id,
        nombres,
        apellidos,
        email,
        rol,
        telefono,
        contraseña: hashedPassword,
      });
    }

    // Generación del token JWT
    const token = await generateJWT(usuario.id);

    return res.status(201).json({
      status: 'success',
      message: 'El usuario se creó exitosamente',
      usuario,
      token,
    });
  } catch (error) {
    // Manejo de errores
    if (error.name === 'SequelizeValidationError') {
      const errors = error.errors.map((err) => err.message);
      return next(new AppError(`Datos inválidos: ${errors(', ')}`, 400));
    }
    return next(
      new AppError(`Error al crear el usuario: ${error.message}`, 500)
    );
  }
};

export const login = async (req, res, next) => {
  try {
    const { email, contraseña } = req.body;

    const usuario = await Usuario.findOne({
      where: {
        email,
        estado: 'Activo',
      },
    });

    // Verificar si el usuario existe
    if (!usuario) {
      return next(new AppError('El correo no se encuentra registrado', 401));
    }

    // Verificar la contraseña
    const passwordMatch = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!passwordMatch) {
      return next(new AppError('Contraseña incorrecta.', 401));
    }

    // Generar token JWT
    const token = await generateJWT(usuario.id);

    // Enviar respuesta con éxito
    return res.status(200).json({
      status: 'success',
      message: 'El usuario inició sesión exitosamente',
      usuario,
      token,
    });
  } catch (error) {
    // Manejo de errores
    return next(new AppError(`Error al iniciar sesión: ${error.message}`, 500));
  }
};

export const updatePassword = async (req, res, next) => {
  try {
    // Extraer datos del cuerpo de la solicitud y el usuario autenticado
    const { contraseña } = req.body;
    const { usuario } = req;

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(contraseña, salt);

    await usuario.update({
      contraseña: hashedPassword,
    });

    // Responder con los datos actualizados del usuario
    return res.status(200).json({
      status: 'success',
      message: 'Los datos del usuario se actualizaron exitosamente',
      usuario,
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

export const update = async (req, res, next) => {
  try {
    // Extraer datos del cuerpo de la solicitud y el usuario autenticado
    const { nombres, apellidos, email, rol, telefono, consultorioId, estado } =
      req.body;
    const { usuario } = req;

    // Actualizar los datos del usuario
    await usuario.update({
      consultorioId,
      nombres,
      apellidos,
      rol,
      email,
      telefono,
      estado,
    });

    // Responder con los datos actualizados del usuario
    return res.status(200).json({
      status: 'success',
      message: 'Los datos del usuario se actualizaron exitosamente',
      usuario,
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
  const { usuario } = req;

  try {
    // Eliminar el usuario de la base de datos
    await usuario.update({
      estado: 'Desconectado',
    });
    // Responder con un mensaje de éxito
    return res.status(200).json({
      status: 'success',
      message: 'El usuario ha sido eliminado exitosamente',
    });
  } catch (error) {
    // Manejo de errores
    return next(
      new AppError(
        `Hubo un error al eliminar el usuario con el ID ${usuario.id}: ${error.message}`,
        500
      )
    );
  }
};
