import express from 'express';

import * as consultaMiddleware from '../middlewares/consulta.middleware.js';
import * as consultaController from '../controllers/consulta.controllers.js';

import * as pacienteMiddleware from '../middlewares/paciente.middleware.js';

const router = express.Router();

router.get('/', consultaController.findAll);
router.get(
  '/paciente/:id',
  pacienteMiddleware.validExistPaciente,
  consultaController.findAllPacienteId
);

router
  .route('/:id')
  .patch(consultaMiddleware.validExistConsulta, consultaController.update)
  .post(pacienteMiddleware.validExistPaciente, consultaController.create)
  .get(consultaMiddleware.validExistConsulta, consultaController.findOne)
  .delete(
    consultaMiddleware.validExistConsulta,
    consultaController.deleteElement
  );

const consultaRouter = router;

export { consultaRouter };
