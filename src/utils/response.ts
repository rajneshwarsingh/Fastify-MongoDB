import { FastifyReply } from 'fastify';

export const sendSuccessResponse = (reply: FastifyReply, statusCode: number, message: string, data: unknown = null) => {
  const response = {
    statusCode,
    message,
    data,
  };

  reply.status(statusCode).send(response);
};

export const sendErrorResponse = (reply: FastifyReply, statusCode: number, message: string, error: unknown = null) => {
  const response: unknown = {
    statusCode,
    message,
  };

  if (error) {
    response.error = error;
  }

  reply.status(statusCode).send(response);
};
