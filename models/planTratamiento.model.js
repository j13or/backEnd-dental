import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const PlanTratamiento = db.define('planTratamiento', {
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
  observaciones: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  montoTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  acuenta: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  deuda: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  linkFile: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
});

export { PlanTratamiento };
