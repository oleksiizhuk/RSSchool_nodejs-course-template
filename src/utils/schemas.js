const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const UUID_VERSION = 'uuidv4';

const schemas = {
  taskId: {
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required(),
    boardId: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  },
  id: {
    id: Joi.objectId().required()
  },
  user: Joi.object()
    .options({ abortEarly: false, allowUnknown: true })
    .keys({
      name: Joi.string()
        .min(3)
        .max(30)
        .required(),
      login: Joi.string()
        .min(3)
        .max(30)
        .required(),
      password: Joi.string().regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[_@$!%*?&])[A-Za-z\d_@$!%*?&]{8,}$/
      )
    })
};

module.exports = schemas;
