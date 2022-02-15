import { FastifyReply, FastifyRequest } from 'fastify';
import { ProductService } from '../services/product.service';
import { sendSuccessResponse, sendErrorResponse } from '../utils/response';
import statusCodes from '../utils/statusCodes';
import messages from '../utils/messages';

const productService = new ProductService();

export class ProductController {
  async createProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const product = await productService.createProduct(request.body, request.user.userId);
      return sendSuccessResponse(reply, statusCodes.CREATED, messages.PRODUCT_CREATED, product);
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.BAD_REQUEST, error.message);
    }
  }

  async getProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const product = await productService.getProductById(id);
      if (!product) {
        return sendErrorResponse(reply, statusCodes.NOT_FOUND, messages.PRODUCT_NOT_FOUND);
      }
      return sendSuccessResponse(reply, statusCodes.OK, messages.PRODUCT_FETCHED, product);
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR, error.message);
    }
  }

  async updateProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const product = await productService.updateProduct(id, request.body);
      if (!product) {
        return sendErrorResponse(reply, statusCodes.NOT_FOUND, messages.PRODUCT_NOT_FOUND);
      }
      return sendSuccessResponse(reply, statusCodes.OK, messages.PRODUCT_UPDATED, product);
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR, error.message);
    }
  }

  async deleteProduct(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = request.params as { id: string };
      const product = await productService.deleteProduct(id);
      if (!product) {
        return sendErrorResponse(reply, statusCodes.NOT_FOUND, messages.PRODUCT_NOT_FOUND);
      }
      return sendSuccessResponse(reply, statusCodes.OK, messages.PRODUCT_DELETED);
    } catch (error: unknown) {
      return sendErrorResponse(reply, statusCodes.INTERNAL_SERVER_ERROR, messages.SERVER_ERROR, error.message);
    }
  }
}
