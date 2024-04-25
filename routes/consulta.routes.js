import express from 'express';

import * as consultaMiddleware from '../middlewares/consulta.middleware.js';
import * as consultaController from '../controllers/consulta.controllers.js';

import * as pacienteMiddleware from '../middlewares/paciente.middleware.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.get('/consultorio/:id', consultaController.findAll);
router.get('/consultas/:id', consultaController.findAllConsultasId);

router.get(
  '/paciente/:id',
  pacienteMiddleware.validExistPaciente,
  consultaController.findAllPacienteId
);

router
  .route('/:id')
  .patch(consultaMiddleware.validExistConsulta, consultaController.update)
  .post(
    upload.single('linkFile'),
    pacienteMiddleware.validExistPaciente,
    consultaController.create
  )
  .get(consultaMiddleware.validExistConsulta, consultaController.findOne)
  .delete(
    consultaMiddleware.validExistConsulta,
    consultaController.deleteElement
  );

const consultaRouter = router;

export { consultaRouter };
