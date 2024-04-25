import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const Cita = db.define('cita', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  pacienteId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  consultorioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  estado: {
    type: DataTypes.ENUM('activo', 'pasado'),
    allowNull: false,
    defaultValue: 'activo',
  },
});

export { Cita };
