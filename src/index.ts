import "reflect-metadata";
require("dotenv").config();

import { App } from "./config/app";
import { Database } from "./config/database";
import { logger } from "./utils/logger";
import { MONGO_URL } from './config/config';
import { fixtures } from './fixtures';

const port = process.env.PORT;
const createApp = new App();
const db = new Database();
const server = createApp.getServerReference();

server.listen(port, () => {
  logger.info(`Server running on port ${port}!`);
  if (MONGO_URL) {
    db.connect(MONGO_URL);
    fixtures();
  } else {
    logger.fatal('Could not connect to the database by the fact that the database URI was not provided! try to start the application setting the environment variable!')
  }
})
.on("error", async error => {
  logger.error(`error index `, error);
});

