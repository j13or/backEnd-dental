import { Cita } from './cita.model.js';
import { Consulta } from './consulta.model.js';
import { Consultorio } from './consultorio.model.js';
import { Paciente } from './paciente.model.js';
import { TratamientoDental } from './traramientoDental.model.js';
import { Usuario } from './usuario.model.js';

const initModel = () => {
  Consultorio.hasMany(Usuario, { foreignKey: 'consultorioId' });
  Usuario.belongsTo(Consultorio, { foreignKey: 'consultorioId' });

  Paciente.hasMany(Consulta, { foreignKey: 'pacienteId' });
  Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId' });

  Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
  Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });

  Consulta.hasMany(TratamientoDental, { foreignKey: 'consultaId' });
  TratamientoDental.belongsTo(Consulta, { foreignKey: 'consultaId' });
};

export { initModel };
