import EErrors from '../utils/errors/errorsEnums.js';

export default (error, req, res, next) => {
  console.error(error);
  switch (error.code) {
    case EErrors.BAD_REQUEST:
      res.status(400).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.VALIDATION_ERROR:
      res.status(400).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.AUTH_ERROR:
      res.status(401).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.RESOURCE_NOT_FOUND:
      res.status(404).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.DATABASE_ERROR:
      res.status(500).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.INTERNAL_SERVER_ERROR:
      res.status(500).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.CONFLICT_ERROR:
      res.status(409).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.PERMISSION_ERROR:
      res.status(403).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.INVALID_TYPES_ERROR:
      res.status(400).send({ status: 'error', cause: error.cause });
      break;
    case EErrors.ROUTING_ERROR:
      res.status(404).send({ status: 'error', cause: error.cause });
      break;
    default:
      res.status(429).send({ status: 'error', cause: 'Unhandled error' });
      break;
  }
};
