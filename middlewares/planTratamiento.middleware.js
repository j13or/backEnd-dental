import { PlanTratamiento } from '../models/planTratamiento.model.js';
import { AppError } from '../utils/AppError.js';

export const validExistPlanTratamiento = async (req, res, next) => {
  try {
    const { id } = req.params;

    const planTratamiento = await PlanTratamiento.findOne({
      where: {
        id,
      },
    });

    if (!planTratamiento) {
      return next(
        new AppError(`La planTratamiento con el id: ${id} no existe`, 404)
      );
    }

    req.planTratamiento = planTratamiento;
    next();
  } catch (error) {
    return next(
      new AppError(`Error al buscar el planTratamiento: ${error.message}`, 500)
    );
  }
};
