import express from 'express';

import * as consultorioMiddleware from '../middlewares/consultorio.middleware.js';
import * as consultorioController from '../controllers/consultorio.controller.js';
import * as autenticaciónMiddleware from '../middlewares/autenticación.middleware.js';

const router = express.Router();

router.get('/', consultorioController.findAll);

router.use(autenticaciónMiddleware.proteger);
router.post('/', consultorioController.create);
router
  .route('/:id')
  .patch(
    consultorioMiddleware.validExistConsultorio,
    consultorioController.update
  )
  .get(
    consultorioMiddleware.validExistConsultorio,
    consultorioController.findOne
  )
  .delete(
    consultorioMiddleware.validExistConsultorio,
    consultorioController.deleteElement
  );

const consultorioRouter = router;

export { consultorioRouter };
