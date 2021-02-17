import { FastifyInstance } from 'fastify';
import { ProductController } from '../controllers/product.controller';
import { authenticate } from '../middleware/auth';
import { createProduct, updateProduct } from '../validators/product.schema';
const productController = new ProductController();

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/', { preHandler: [authenticate], schema: createProduct }, productController.createProduct);
  fastify.get('/:id', productController.getProduct);
  fastify.put('/:id', { preHandler: [authenticate], schema: updateProduct }, productController.updateProduct);
  fastify.delete('/:id', { preHandler: [authenticate] }, productController.deleteProduct);
}
