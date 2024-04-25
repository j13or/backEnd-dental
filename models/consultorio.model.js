import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const Consultorio = db.define('consultorio', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  nombreConsultorio: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  direccion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Consultorio };
