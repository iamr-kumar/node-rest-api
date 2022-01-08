import { CreateUserInput } from "./../schema/user.schema";
import { Request, Response } from "express";
import { createUser } from "../service/user.service";
import logger from "../utils/logger";
import { omit } from "lodash";

export async function createUserHandler(
  req: Request<{}, {}, CreateUserInput["body"]>,
  res: Response
) {
  try {
    const user = await createUser(req.body);
    return res.json(omit(user.toJSON(), "password"));
  } catch (err: any) {
    logger.error(err);
    return res.status(409).json({ message: err.message });
  }
}
