import { youtubeApi } from "./youtube";

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

export const videosApi = youtubeApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchVideosByCategory: builder.query<VideoResponse, string | undefined>({
      query: (id) => (id ? `videos/${id}` : "videos"),
      providesTags: ["Videos"],
    }),
  }),
  overrideExisting: true
});

export const { useFetchVideosByCategoryQuery } = videosApi;
