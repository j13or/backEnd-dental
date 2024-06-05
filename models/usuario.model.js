import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const Usuario = db.define('usuario', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  consultorioId: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  carnet: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  contraseña: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  estado: {
    type: DataTypes.ENUM('Activo', 'Desconectado'),
    allowNull: false,
    defaultValue: 'Activo',
  },
  rol: {
    type: DataTypes.ENUM('SuperAdmin', 'Administrador', 'Doctor', 'Secretaria'),
    allowNull: false,
    defaultValue: 'Administrador',
  },
});

export { Usuario };
