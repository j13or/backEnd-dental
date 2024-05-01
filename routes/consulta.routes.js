import express from 'express';

import * as consultaMiddleware from '../middlewares/consulta.middleware.js';
import * as consultaController from '../controllers/consulta.controllers.js';

import * as planTratamientoMiddleware from '../middlewares/planTratamiento.middleware.js';

const router = express.Router();

router.get('/plan-tratamiento/:id', consultaController.findAll);

router
  .route('/:id')
  .patch(consultaMiddleware.validExistConsulta, consultaController.update)
  .post(
    planTratamientoMiddleware.validExistPlanTratamiento,
    consultaController.create
  )
  .get(consultaMiddleware.validExistConsulta, consultaController.findOne)
  .delete(
    consultaMiddleware.validExistConsulta,
    consultaController.deleteElement
  );

const consultaRouter = router;

export { consultaRouter };
