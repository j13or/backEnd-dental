import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const Tratamiento = db.define('tratamiento', {
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
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Tratamiento };
