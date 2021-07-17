// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { google, youtube_v3 } from "googleapis";
import { requireAuth } from "../../utils/requireAuth";

const videoCategoriesHandler = requireAuth(async (req: NextApiRequest, res: NextApiResponse<youtube_v3.Schema$VideoCategoryListResponse>) => {
  const youtube = google.youtube("v3");
  const videoCategoriesQuery = await youtube.videoCategories.list({
    part: ["snippet"],
    regionCode: "US",
    key: process.env.GOOGLE_API_KEY,
  });
  const videoCategories = videoCategoriesQuery.data;
  res.status(200).json({
    ...videoCategories,
    items: videoCategories.items?.filter((category) => category.snippet?.assignable),
  });
});

export default videoCategoriesHandler;
