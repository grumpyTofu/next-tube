// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google, youtube_v3 } from "googleapis";
import { requireAuth } from "../../../utils/requireAuth";

const videosHandler = requireAuth(async (req: NextApiRequest, res: NextApiResponse<youtube_v3.Schema$VideoListResponse>) => {
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
});

export default videosHandler;
