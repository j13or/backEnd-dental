import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const Paciente = db.define('paciente', {
  id: {
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  carnet: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  nombres: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoPaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  apellidoMaterno: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  genero: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  telefono: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  fechaDeNacimiento: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  alergia: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tipoDeSangre: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Paciente };
