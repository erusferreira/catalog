import "reflect-metadata";
require("dotenv").config();

import { App } from "@adapter/config/app";
import { Database } from "@adapter/database/database";
import { logger } from "@adapter/utils/logger";
import { MONGO_URL } from '@adapter/config/config';
import { fixtures } from '@adapter/repository/fixtures';

import './adapter/message-broker/consumer'

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

