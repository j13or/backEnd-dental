import express from 'express';

import * as pacienteMiddleware from '../middlewares/paciente.middleware.js';
import * as pacienteController from '../controllers/paciente.controllers.js';
import * as autenticaciónMiddleware from '../middlewares/autenticación.middleware.js';

const router = express.Router();

router.use(autenticaciónMiddleware.proteger);

router.get('/', pacienteController.findAll);
router.post('/', pacienteController.create);

router
  .route('/:id')
  .patch(pacienteMiddleware.validExistPaciente, pacienteController.update)
  .get(pacienteMiddleware.validExistPaciente, pacienteController.findOne)
  .delete(
    pacienteMiddleware.validExistPaciente,
    pacienteController.deleteElement
  );

const pacienteRouter = router;

export { pacienteRouter };
