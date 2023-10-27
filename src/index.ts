import "reflect-metadata";
require("dotenv").config();

import { App } from "./config/app";
import { logger } from "./utils/logger";

const port = process.env.PORT;
const createApp = new App();
const server = createApp.getServerReference();

server.listen(port, () => {
  logger.info(`Server running on port ${port}!`);
})
.on("error", async error => {
  logger.error(`error index `, error);
});

