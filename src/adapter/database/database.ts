const mongoose = require('mongoose');

import { logger } from '../utils/logger';
import { DatabaseInterface } from './database.interface';

export class Database implements DatabaseInterface {
  
  public async connect(uri: string): Promise<void> {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      ignoreUndefined: true,
    })
    .then(() => {
      logger.info(`Database connection successful`);
    })
    .catch((err: Error) => {
      logger.fatal("Database connection error => " + err.message);
      throw Error("Database connection error");
    });
  }
  public async disconnect(): Promise<void> {
    return mongoose.connection.close();
  }
  
  public connected(): boolean {
    return mongoose.connection ? mongoose.connection.readyState === 1 : false;
  }

}
