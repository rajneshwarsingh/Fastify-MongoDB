import { FastifyInstance } from 'fastify';
import { UserController } from '../controllers/user.controller';
import { authenticate } from '../middleware/auth';
import userValidation from '../validators/user.validator';
const userController = new UserController();

export default async function userRoutes(fastify: FastifyInstance) {
  fastify.post('/signup', { preHandler: [userValidation('signup')] }, userController.createUser.bind(userController));
  fastify.post('/login', { preHandler: [userValidation('logIn')] }, userController.loginUser.bind(userController));
  fastify.get('/:id', { preHandler: [authenticate] }, userController.getUser.bind(userController));
  fastify.put('/:id', { preHandler: [authenticate, userValidation('update')] }, userController.updateUser.bind(userController));
  fastify.delete('/:id', { preHandler: [authenticate] }, userController.deleteUser.bind(userController));
}
