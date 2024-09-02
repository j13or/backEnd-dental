import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const Consulta = db.define('consulta', {
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
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

export { Consulta };
