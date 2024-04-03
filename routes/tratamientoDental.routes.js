import express from 'express';

import * as tratamientoDentalController from '../controllers/tratamientoDental.controllers.js';
import * as tratamientoDentalMiddleware from '../middlewares/tratamientoDental.middleware.js';

import * as consultaMiddleware from '../middlewares/consulta.middleware.js';

const router = express.Router();

router.get('/', tratamientoDentalController.findAll);

router
  .route('/:id')
  .post(
    consultaMiddleware.validExistConsulta,
    tratamientoDentalController.create
  )
  .patch(
    tratamientoDentalMiddleware.validExistTratamientoDental,
    tratamientoDentalController.update
  )
  .get(
    tratamientoDentalMiddleware.validExistTratamientoDental,
    tratamientoDentalController.findOne
  )
  .delete(
    tratamientoDentalMiddleware.validExistTratamientoDental,
    tratamientoDentalController.deleteElement
  );

const traramientoDentalRouter = router;

export { traramientoDentalRouter };
