// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google, youtube_v3 } from "googleapis";
import { requireAuth } from "../../../utils/requireAuth";

const videosByCategoryIdHandler = requireAuth(async (req: NextApiRequest, res: NextApiResponse<youtube_v3.Schema$VideoListResponse>) => {
  const { id } = req.query as Record<string, string>;
  const youtube = google.youtube("v3");
  const videoQuery = await youtube.videos.list({
    part: ["snippet", "contentDetails", "statistics"],
    chart: "mostPopular",
    regionCode: "US",
    maxResults: 20,
    videoCategoryId: id,
    key: process.env.GOOGLE_API_KEY,
  });
  const videos = videoQuery.data;
  res.status(200).json(videos);
});

export default videosByCategoryIdHandler;
