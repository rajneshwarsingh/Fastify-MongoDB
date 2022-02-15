import { FastifyInstance } from 'fastify';
import { ProductController } from '../controllers/product.controller';
import { authenticate } from '../middleware/auth';
import productValidation from '../validators/product.validator';
const productController = new ProductController();

export default async function productRoutes(fastify: FastifyInstance) {
  fastify.post('/', { preHandler: [authenticate, productValidation('create')] }, productController.createProduct.bind(productController));
  fastify.get('/:id', productController.getProduct.bind(productController));
  fastify.put('/:id', { preHandler: [authenticate] }, productController.updateProduct.bind(productController));
  fastify.delete('/:id', { preHandler: [authenticate] }, productController.deleteProduct.bind(productController));
}
