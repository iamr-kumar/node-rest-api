import config from "config";
import mongoose from "mongoose";
import logger from "./logger";

export const connectDb = async () => {
  const dbUri = config.get<string>("dbUri");
  try {
    await mongoose.connect(dbUri);
    logger.info("Connected to MongoDB");
  } catch (err) {
    logger.error(err);
    process.exit(1);
  }
};
