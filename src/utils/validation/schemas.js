const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
const UUID_VERSION = 'uuidv4';

const schemas = {
  taskId: Joi.object({
    id: Joi.string()
      .guid({ version: UUID_VERSION })
      .required(),
    boardId: Joi.string()
      .guid({ version: UUID_VERSION })
      .required()
  }),
  id: Joi.object({
    id: Joi.objectId().required()
  }),
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
      password: Joi.string().regex(/[a-zA-Z0-9]/)
    })
};

module.exports = schemas;
