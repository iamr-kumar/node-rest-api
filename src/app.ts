import config from "config";
import express from "express";
import routes from "./routes";
import { connectDb } from "./utils/connectDb";
import logger from "./utils/logger";

const port = config.get<number>("port");

const app = express();

app.use(express.json());

app.listen(port, async () => {
  logger.info(`Listening on port ${port}`);
  await connectDb();
  routes(app);
});
