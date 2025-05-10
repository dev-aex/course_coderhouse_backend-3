import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'express-compression';
import swaggerUIExpress from 'swagger-ui-express';
import swaggerSpecs from './config/swagger.config.js';

import env from './config/env.config.js';
import ConnectMongoDB from './config/mongo.config.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';
import errorsMiddleware from './middlewares/errors.middleware.js';
import addLogger from './middlewares/logger.middleware.js';

const app = express();
const port = env.port;

app.use(express.json());
app.use(cookieParser());
app.use(compression());

// App routes
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// Docs route
app.use(
  '/api/docs',
  swaggerUIExpress.serve,
  swaggerUIExpress.setup(swaggerSpecs)
);

// Middlewares
app.use(errorsMiddleware);
app.use(addLogger);

// Database connection
ConnectMongoDB.getInstance();

// Listener
app.listen(port, () => {
  console.log(`Server up on port: http://localhost:${port}`);
});
