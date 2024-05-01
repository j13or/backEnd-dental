import express from 'express';

import * as citaEnLineaMiddleware from '../middlewares/citaEnLinea.middleware.js';
import * as citaEnLineaController from '../controllers/citaEnLinea.controllers.js';
import * as autenticaciónMiddleware from '../middlewares/autenticación.middleware.js';
import * as consultorioMiddleware from '../middlewares/consultorio.middleware.js';

const router = express.Router();

router.get(
  '/consultorio/:id',
  consultorioMiddleware.validExistConsultorio,
  citaEnLineaController.findAll
);
router.post('/:id', citaEnLineaController.create);
router.use(autenticaciónMiddleware.proteger);

router
  .route('/:id')
  .patch(
    citaEnLineaMiddleware.validExistCitaEnLinea,
    citaEnLineaController.update
  )
  .get(
    citaEnLineaMiddleware.validExistCitaEnLinea,
    citaEnLineaController.findOne
  )
  .delete(
    citaEnLineaMiddleware.validExistCitaEnLinea,
    citaEnLineaController.deleteElement
  );

const citaEnLineaRouter = router;

export { citaEnLineaRouter };
