import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const PagosTratamiento = db.define('pagosTratamiento', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  planTratamientoId: {
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
  fecha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  pago: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { PagosTratamiento };
