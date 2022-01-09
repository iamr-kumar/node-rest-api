import config from "config";
import { Request, Response } from "express";
import { createSession } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt";
import logger from "../utils/logger";

export async function createUserSessionHandler(req: Request, res: Response) {
  try {
    const user = await validatePassword(req.body);
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    const session = await createSession(user._id, req.get("user-agent") || "");
    const accessToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("accessTokenTtl") }
    );
    const refreshToken = signJwt(
      { ...user, session: session._id },
      { expiresIn: config.get("refreshTokenTtl") }
    );
    res.json({ accessToken, refreshToken });
  } catch (err: any) {
    logger.error(err);
    res.status(500).json({ message: err.message });
  }
}
