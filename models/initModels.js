import { Cita } from './cita.model.js';
import { Consulta } from './consulta.model.js';
import { Consultorio } from './consultorio.model.js';
import { Paciente } from './paciente.model.js';
import { PlanTratamiento } from './planTratamiento.model.js';
import { TratamientoDental } from './traramientoDental.model.js';
import { Usuario } from './usuario.model.js';

const initModel = () => {
  Consultorio.hasMany(Usuario, { foreignKey: 'consultorioId' });
  Usuario.belongsTo(Consultorio, { foreignKey: 'consultorioId' });

  Consultorio.hasMany(Paciente, { foreignKey: 'consultorioId' });
  Paciente.belongsTo(Consultorio, { foreignKey: 'consultorioId' });

  Paciente.hasMany(Consulta, { foreignKey: 'pacienteId' });
  Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId' });

  Paciente.hasMany(Consulta, { foreignKey: 'pacienteId' });
  Consulta.belongsTo(Paciente, { foreignKey: 'pacienteId' });

  Paciente.hasMany(Cita, { foreignKey: 'pacienteId' });
  Cita.belongsTo(Paciente, { foreignKey: 'pacienteId' });

  Paciente.hasMany(PlanTratamiento, { foreignKey: 'pacienteId' });
  PlanTratamiento.belongsTo(Paciente, { foreignKey: 'pacienteId' });

  PlanTratamiento.hasMany(TratamientoDental, {
    foreignKey: 'planTratamientoId',
  });
  TratamientoDental.belongsTo(PlanTratamiento, {
    foreignKey: 'planTratamientoId',
  });
};

export { initModel };
