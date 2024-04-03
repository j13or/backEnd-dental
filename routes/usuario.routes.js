import express from 'express';

import * as usuarioMiddleware from '../middlewares/usuario.middleware.js';
import * as usuarioController from '../controllers/usuario.controllers.js';
import * as autenticaciónMiddleware from '../middlewares/autenticación.middleware.js';

const router = express.Router();

router.get('/', usuarioController.findAll);
router.post('/login', usuarioController.login);
router.post('/signup', usuarioController.signup);

router.use(autenticaciónMiddleware.proteger);

router
  .route('/:id')
  .patch(usuarioMiddleware.validExistUsuario, usuarioController.update)
  .get(usuarioMiddleware.validExistUsuario, usuarioController.findOne)
  .delete(usuarioMiddleware.validExistUsuario, usuarioController.deleteElement);

const usuarioRouter = router;

export { usuarioRouter };
