// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";
import { google, youtube_v3 } from "googleapis";
import { requireAuth } from "../../utils/requireAuth";

const subscriptionsHandler = requireAuth(async (req: NextApiRequest, res: NextApiResponse<youtube_v3.Schema$SubscriptionListResponse>) => {
  const token = await jwt.getToken({ req, secret: process.env.JWT_SECRET });
  const youtube = google.youtube("v3");
  const subscriptionsQuery = await youtube.subscriptions.list({
    part: ["snippet", "contentDetails"],
    mine: true,
    maxResults: 50,
    key: process.env.GOOGLE_API_KEY,
    access_token: token?.accessToken,
  });
  const subscriptions = subscriptionsQuery.data;
  res.status(200).json(subscriptions);
});

export default subscriptionsHandler;
