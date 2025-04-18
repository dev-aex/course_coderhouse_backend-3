import express from 'express';
import cookieParser from 'cookie-parser';
import compression from 'express-compression';

import env from './config/env.config.js';
import ConnectMongoDB from './config/mongo.config.js';
import usersRouter from './routes/users.router.js';
import petsRouter from './routes/pets.router.js';
import adoptionsRouter from './routes/adoption.router.js';
import sessionsRouter from './routes/sessions.router.js';
import mocksRouter from './routes/mocks.router.js';

const app = express();
const PORT = env.port;

app.use(compression());
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/users', usersRouter);
app.use('/api/pets', petsRouter);
app.use('/api/adoptions', adoptionsRouter);
app.use('/api/sessions', sessionsRouter);
app.use('/api/mocks', mocksRouter);

// Database connection
ConnectMongoDB.getInstance();

// Listener
app.listen(PORT, () => {
  console.log(`Server up on port: http://localhost:${PORT}`);
});
