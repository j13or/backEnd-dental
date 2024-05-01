import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const CitaEnLinea = db.define('citaEnLinea', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  consultorioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  nombresApellidos: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  hora: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  comentario: {
    type: DataTypes.TEXT,
    allowNull: false,
  },

  estado: {
    type: DataTypes.ENUM('activo', 'inactivo', 'confirmar'),
    allowNull: false,
    defaultValue: 'confirmar',
  },
});

export { CitaEnLinea };
