import Fastify from 'fastify';
import userRoutes from './routes/user.routes';
import productRoutes from './routes/product.routes';
import mongoose from 'mongoose';
import helmet from 'helmet';
import cors from 'cors';
import dotenv from 'dotenv';
dotenv.config();

const fastify = Fastify();
helmet();
cors();
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });

fastify.register(userRoutes, { prefix: 'api/v1/user' });
fastify.register(productRoutes, { prefix: 'api/v1/product' });

fastify.listen(process.env.PORT, (err, address) => {
  if (err) {
    console.error('Error starting server:', err);
    process.exit(1);
  }
  console.log(`Server listening on ${address}`);
});
