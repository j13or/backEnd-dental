import { Consulta } from './consulta.model.js';
import { Paciente } from './paciente.model.js';
import { TratamientoDental } from './traramientoDental.model.js';

const initModel = () => {
  Paciente.hasMany(Consulta, { foreignKey: 'pacienteId' });
  Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId' });

  Consulta.hasMany(TratamientoDental, { foreignKey: 'consultaId' });
  TratamientoDental.belongsTo(Consulta, { foreignKey: 'consultaId' });
};

export { initModel };
