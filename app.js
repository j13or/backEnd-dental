import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import hpp from 'hpp';
import xss from 'xss-clean';
import cors from 'cors';
import { globalErrorHandler } from './controllers/error.controllers.js';
import { AppError } from './utils/AppError.js';

import { usuarioRouter } from './routes/usuario.routes.js';
import { citaRouter } from './routes/cita.routes.js';
import { pacienteRouter } from './routes/pacientes.routes.js';
import { consultaRouter } from './routes/consulta.routes.js';
import { traramientoDentalRouter } from './routes/tratamientoDental.routes.js';
import { consultorioRouter } from './routes/consultorio.routes.js';
import { traatamientoRouter } from './routes/tratamiento.routes.js';
import { citaEnLineaRouter } from './routes/citaEnLinea.routes.js';
import { planTratamientoRouter } from './routes/planTratamiento.routes.js';
import { tipoSangreRouter } from './routes/tipoSangre.routes.js';
import { pagoTratamientoRouter } from './routes/pagoTratamiento.routes.js';

const app = express();
app.use(express.json());

const limiter = rateLimit({
  max: 100000,
  windowMs: 60 * 60 * 1000,
  message: 'Too many request from this Ip, please try again in an hour!',
});

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(hpp());

app.use('/api/v1', limiter);
app.use('/api/v1/consultorio', consultorioRouter);
app.use('/api/v1/usuario', usuarioRouter);
app.use('/api/v1/cita', citaRouter);
app.use('/api/v1/cita-linea', citaEnLineaRouter);
app.use('/api/v1/paciente', pacienteRouter);
app.use('/api/v1/tratamiento', traatamientoRouter);
app.use('/api/v1/tipo-sangre', tipoSangreRouter);
app.use('/api/v1/consulta', consultaRouter);
app.use('/api/v1/pagos', pagoTratamientoRouter);
app.use('/api/v1/tratamiento-dental', traramientoDentalRouter);
app.use('/api/v1/plan-tratamiento', planTratamientoRouter);

app.all('*', (req, res, next) => {
  return next(
    new AppError(`Can't find ${req.originalUrl} on this server! 💀`, 404)
  );
});
app.use(globalErrorHandler);

export { app };
