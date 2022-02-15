/*
 * @file: validators/joi.validator.js
 * @description: It contain validation function on request body, params and query.
 * @author: Rajneshwar Singh
 */
import { FastifyReply, FastifyRequest } from 'fastify';
import joi from 'joi';
import { sendErrorResponse } from '../utils/response';
import statusCodes from '../utils/statusCodes';

// Object schema validation
const create = joi.object({
  name: joi.string().required(),
  description: joi.string().required(),
  price: joi.number().required(),
});

function productValidation(schema: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const option = {
      abortEarly: false,
      allowUnknown: false,
    };

    if (schema == 'create') {
      var { error } = create.validate(request.body, option);
    }

    if (error) return sendErrorResponse(reply, statusCodes.BAD_REQUEST, error.details[0].message);
  };
}

export default productValidation;
