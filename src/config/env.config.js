import dotenv from 'dotenv';

dotenv.config();

export default {
  port: process.env.PORT || 9090,
  mongoUrl: process.env.MONGODB_URL,
};
