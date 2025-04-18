import mongoose from 'mongoose';
import env from './env.config.js';

const MONGO_URI = env.mongoUrl;

class ConnectMongoDB {
  static #instance;
  static async getInstance() {
    if (!ConnectMongoDB.#instance) {
      await mongoose.connect(MONGO_URI);
      ConnectMongoDB.#instance = mongoose.connection;
      console.log('Database connected');
    } else {
      console.log('Database already connected');
    }
    return ConnectMongoDB.#instance;
  }
}

export default ConnectMongoDB;
