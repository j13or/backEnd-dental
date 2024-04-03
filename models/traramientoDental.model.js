import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const TratamientoDental = db.define('tratamientoDental', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  consultaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  codigoDiente: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tratamiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  precio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { TratamientoDental };