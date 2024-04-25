import express from 'express';

import * as tratamientoMiddleware from '../middlewares/tratamiento.middleware.js';
import * as tratamientoController from '../controllers/tratamiento.controllers.js';
import * as autenticaciónMiddleware from '../middlewares/autenticación.middleware.js';

const router = express.Router();

router.use(autenticaciónMiddleware.proteger);

router.get('/consultorio/:id', tratamientoController.findAll);
router.post('/', tratamientoController.create);

router
  .route('/:id')
  .patch(
    tratamientoMiddleware.validExistTratamiento,
    tratamientoController.update
  )
  .get(
    tratamientoMiddleware.validExistTratamiento,
    tratamientoController.findOne
  )
  .delete(
    tratamientoMiddleware.validExistTratamiento,
    tratamientoController.deleteElement
  );

const traatamientoRouter = router;

export { traatamientoRouter };
