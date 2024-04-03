import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const Consulta = db.define('consulta', {
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
  titulo: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  montoTotal: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Consulta };
