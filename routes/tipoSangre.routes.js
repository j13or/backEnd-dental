import express from 'express';

import * as tipoSangreMiddleware from '../middlewares/tipoSangre.middleware.js';
import * as tipoSangreController from '../controllers/tipoSangre.controllers.js';
import * as autenticaciónMiddleware from '../middlewares/autenticación.middleware.js';

const router = express.Router();

router.use(autenticaciónMiddleware.proteger);

router.get('/consultorio/:id', tipoSangreController.findAll);
router.post('/', tipoSangreController.create);

router
  .route('/:id')
  .patch(tipoSangreMiddleware.validExistTipoSangre, tipoSangreController.update)
  .get(tipoSangreMiddleware.validExistTipoSangre, tipoSangreController.findOne)
  .delete(
    tipoSangreMiddleware.validExistTipoSangre,
    tipoSangreController.deleteElement
  );

const tipoSangreRouter = router;

export { tipoSangreRouter };
