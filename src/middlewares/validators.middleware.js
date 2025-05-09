import CustomError from '../utils/errors/customError.js';
import EErrors from '../utils/errors/errorsEnums.js';

export default (validator) => (req, res, next) => {
  try {
    const result = validator.safeParse(req.params);

    if (!result.success) {
      CustomError.create({
        name: 'Validation Error',
        cause: 'Bad requets',
        message: result.error,
        code: EErrors.INVALID_TYPES_ERROR,
      });
    }
    next();
  } catch (error) {
    next(error);
  }
};
