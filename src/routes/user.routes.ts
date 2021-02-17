import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';
import { signup, login, update } from '../validators/user.schema';
const userController = new UserController();

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/signup', { schema: signup }, userController.createUser);
  fastify.post('/login', { schema: login }, userController.loginUser);
  fastify.get('/:id', { preHandler: [authenticate] }, userController.getUser);
  fastify.put('/:id', { preHandler: [authenticate], schema: update }, userController.updateUser);
  fastify.delete('/:id', { preHandler: [authenticate] }, userController.deleteUser);
}
