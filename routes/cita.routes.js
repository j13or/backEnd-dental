import express from 'express';

import * as citaMiddleware from '../middlewares/cita.middleware.js';
import * as citaController from '../controllers/cita.controllers.js';

import * as pacienteMiddleware from '../middlewares/paciente.middleware.js';

const router = express.Router();

router.get('/', citaController.findAll);

router.get(
  '/paciente/:id',
  pacienteMiddleware.validExistPaciente,
  citaController.findAllPacienteId
);

router.post(
  '/paciente/:id',
  pacienteMiddleware.validExistPaciente,
  citaController.create
);

router
  .route('/:id')
  .patch(citaMiddleware.validExistCita, citaController.update)
  .get(citaMiddleware.validExistCita, citaController.findOne)
  .delete(citaMiddleware.validExistCita, citaController.deleteElement);

const citaRouter = router;

export { citaRouter };
