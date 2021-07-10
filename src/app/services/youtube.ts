import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

interface Thumbnail {
  url: string;
  width: number;
  height: number;
}

export interface Video {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: Thumbnail;
      medium: Thumbnail;
      high: Thumbnail;
      standard: Thumbnail;
      maxres: Thumbnail;
    };
    channelTitle: string;
    tags?: string[];
    categoryId: string;
    liveBroadcastContent: string;
    localized: {
      title: string;
      description: string;
    };
    defaultAudioLanguage?: string;
  };
  contentDetails: {
    duration: string;
    dimension: string;
    definition: string;
    caption: string;
    licensedContent: true;
    contentRating: {};
    projection: string;
  };
  statistics: {
    viewCount: string;
    likeCount: string;
    dislikeCount: string;
    favoriteCount: string;
    commentCount: string;
  };
}

export interface VideoResponse {
  kind: string;
  etag: string;
  items: Video[];
}

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 6 });

export const youtubeApi = createApi({
  reducerPath: "youtube",
  baseQuery: baseQueryWithRetry,
  refetchOnFocus: false,
  tagTypes: ["Videos"],
  endpoints: (builder) => ({
    fetchTrendingVideos: builder.query<VideoResponse, void>({
      query: () => "videos",
      providesTags: ["Videos"],
    }),
  }),
});

export const { useFetchTrendingVideosQuery } = youtubeApi;
