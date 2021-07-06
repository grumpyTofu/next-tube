// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import jwt from "next-auth/jwt";
import { googleClient } from "../../google";
import { google, youtube_v3 } from "googleapis";

const videosHandler = async (req: NextApiRequest, res: NextApiResponse<youtube_v3.Schema$VideoListResponse>) => {
  const token = await jwt.getToken({ req, secret: process.env.JWT_SECRET });
  googleClient.setCredentials({ access_token: token?.accessToken });
  const youtube = google.youtube("v3");
  const videoQuery = await youtube.videos.list({
    part: ["snippet", "contentDetails", "statistics"],
    chart: "mostPopular",
    regionCode: "US",
    maxResults: 20,
    key: process.env.GOOGLE_API_KEY,
  });
  const videos = videoQuery.data;
  res.status(200).json(videos);
};

export default videosHandler;
