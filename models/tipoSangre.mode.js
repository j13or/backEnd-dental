import { DataTypes } from 'sequelize';
import { db } from '../config/db.config.js';

const TipoSangre = db.define('tipoSangre', {
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
});

export { TipoSangre };
