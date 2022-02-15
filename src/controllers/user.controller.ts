import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from '../services/user.service';
import { CreateUserDTO, UpdateUserDTO } from '../utils/interface/user.interface';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response';
import statusCodes from '../utils/statusCodes';
import messages from '../utils/messages';
import { sanitizeUser } from '../utils/common/index';

const userService = new UserService();

export class UserController {
  async createUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const data: CreateUserDTO = request.body as CreateUserDTO;
      const getUser = await userService.findUserByEmail(data.email);

      if (getUser) {
        return sendErrorResponse(reply, statusCodes.BAD_REQUEST, messages.USER_ALREADY_EXISTS);
      }
      const user = await userService.createUser(data);
      return sendSuccessResponse(reply, statusCodes.CREATED, messages.USER_CREATED, sanitizeUser(user.toObject()));
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.BAD_REQUEST, messages.SERVER_ERROR, error.message);
    }
  }

  async getUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await userService.getUserById(id);
      if (!user) {
        return sendErrorResponse(reply, statusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
      }
      return sendSuccessResponse(reply, statusCodes.OK, messages.USER_FETCHED, user);
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR, error.message);
    }
  }

  async updateUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const data: UpdateUserDTO = request.body as UpdateUserDTO;
      const user = await userService.updateUser(id, data);
      if (!user) {
        return sendErrorResponse(reply, statusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
      }
      return sendSuccessResponse(reply, statusCodes.OK, messages.USER_UPDATED, user);
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR, error.message);
    }
  }

  async deleteUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const user = await userService.deleteUser(id);
      if (!user) {
        return sendErrorResponse(reply, statusCodes.NOT_FOUND, messages.USER_NOT_FOUND);
      }
      return sendSuccessResponse(reply, statusCodes.OK, messages.USER_DELETED);
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR, error.message);
    }
  }

  async loginUser(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { email, password } = request.body as { email: string; password: string };
      const user = await userService.authenticateUser(email, password);
      if (!user) {
        return sendErrorResponse(reply, statusCodes.UNAUTHORIZED, messages.INVALID_CREDENTIALS);
      }
      return sendSuccessResponse(reply, statusCodes.OK, messages.LOGIN_SUCCESS, user);
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR, error.message);
    }
  }
}
