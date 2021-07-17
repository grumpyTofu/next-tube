import { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";
import { googleClient } from "./google";

export const requireAuth =
  <T>(fn: (req: NextApiRequest, res: NextApiResponse<T>) => any) =>
  async (req: NextApiRequest, res: NextApiResponse<T>) => {
    const token = await jwt.getToken({ req, secret: process.env.JWT_SECRET });
    if (token) {
      googleClient.setCredentials({ access_token: token?.accessToken });
      return fn(req, res);
    } else {
      return authDeny(req, res);
    }
  };

const authDeny = (req: NextApiRequest, res: NextApiResponse) => {
  res.status(401).send(null);
};
