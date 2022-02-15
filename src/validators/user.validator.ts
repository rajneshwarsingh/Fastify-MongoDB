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
const signup = joi.object({
  email: joi.string().email().required(),
  password: joi.string().max(40).required(),
  name: joi.string().max(30).required(),
});

const logIn = joi.object({
  email: joi.string().email().required(),
  password: joi.string().max(40).required(),
});

const update = joi.object({
  email: joi.string().email(),
  password: joi.string().max(40),
  name: joi.string().max(30),
});

function userValidation(schema: string) {
  return async (request: FastifyRequest, reply: FastifyReply) => {
    const option = {
      abortEarly: false,
      allowUnknown: false,
    };

    if (schema == 'signup') {
      var { error } = signup.validate(request.body, option);
    }

    if (schema == 'login') {
      var { error } = logIn.validate(request.body, option);
    }
    if (schema == 'update') {
      var { error } = update.validate(request.body, option);
    }

    if (error) return sendErrorResponse(reply, statusCodes.BAD_REQUEST, error.details[0].message);
  };
}

export default userValidation;
