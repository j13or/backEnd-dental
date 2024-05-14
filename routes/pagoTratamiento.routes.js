import express from 'express';

import * as pagoTratamientoMiddleware from '../middlewares/pagoTratamiento.middleware.js';
import * as pagoTratamientoController from '../controllers/pagoTratamiento.controllers.js';

import * as planTratamientoMiddleware from '../middlewares/planTratamiento.middleware.js';

const router = express.Router();

router.get('/plan-tratamiento/:id', pagoTratamientoController.findAll);

router
  .route('/:id')
  .patch(
    pagoTratamientoMiddleware.validExistPagosTratamiento,
    pagoTratamientoController.update
  )
  .post(
    planTratamientoMiddleware.validExistPlanTratamiento,
    pagoTratamientoController.create
  )
  .get(
    pagoTratamientoMiddleware.validExistPagosTratamiento,
    pagoTratamientoController.findOne
  )
  .delete(
    pagoTratamientoMiddleware.validExistPagosTratamiento,
    pagoTratamientoController.deleteElement
  );

const pagoTratamientoRouter = router;

export { pagoTratamientoRouter };
