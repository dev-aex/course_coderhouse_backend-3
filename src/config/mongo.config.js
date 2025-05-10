import mongoose from 'mongoose';
import env from './env.config.js';

mongoose.set('strictQuery', false);

class ConnectMongoDB {
  static #instance;
  static async getInstance() {
    if (!ConnectMongoDB.#instance) {
      await mongoose.connect(env.mongoUrl);
      ConnectMongoDB.#instance = mongoose.connection;
      console.log('Database connected');
    } else {
      console.log('Database already connected');
    }
    return ConnectMongoDB.#instance;
  }
}

export default ConnectMongoDB;
