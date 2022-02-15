import { FastifyReply, FastifyRequest } from 'fastify';
import jwt from 'jsonwebtoken';
import { sendErrorResponse } from '../utils/response';
import statusCodes from '../utils/statusCodes';
import messages from '../utils/messages';

export async function authenticate(request: FastifyRequest, reply: FastifyReply) {
  try {
    const authorizationHeader = request.headers.authorization;
    if (!authorizationHeader) {
      return sendErrorResponse(reply, statusCodes.UNAUTHORIZED, messages.NO_TOKEN_PROVIDED);
    }

    const token = authorizationHeader.split(' ')[1];
    if (!token) {
      return sendErrorResponse(reply, statusCodes.UNAUTHORIZED, messages.NO_TOKEN_PROVIDED);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    request.user = decoded as { id: string };
  } catch (error: unknown) {
    return sendErrorResponse(reply, statusCodes.UNAUTHORIZED, messages.UNAUTHORIZED, error.message);
  }
}
