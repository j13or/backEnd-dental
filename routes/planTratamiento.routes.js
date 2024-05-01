import express from 'express';

import * as planTratamientoMiddleware from '../middlewares/planTratamiento.middleware.js';
import * as planTratamientoController from '../controllers/planTratamiento.controllers.js';

import * as pacienteMiddleware from '../middlewares/paciente.middleware.js';
import { upload } from '../utils/multer.js';

const router = express.Router();

router.get('/consultorio/:id', planTratamientoController.findAll);
router.get(
  '/consultas/:id',
  planTratamientoController.findAllPlanTratamientosId
);

router.get(
  '/paciente/:id',
  pacienteMiddleware.validExistPaciente,
  planTratamientoController.findAllPacienteId
);

router
  .route('/:id')
  .patch(
    planTratamientoMiddleware.validExistPlanTratamiento,
    planTratamientoController.update
  )
  .post(
    upload.single('linkFile'),
    pacienteMiddleware.validExistPaciente,
    planTratamientoController.create
  )
  .get(
    planTratamientoMiddleware.validExistPlanTratamiento,
    planTratamientoController.findOne
  )
  .delete(
    planTratamientoMiddleware.validExistPlanTratamiento,
    planTratamientoController.deleteElement
  );

const planTratamientoRouter = router;

export { planTratamientoRouter };
