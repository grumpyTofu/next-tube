import { youtubeApi } from "./youtube";

export interface VideoCategory {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    channelId: string;
    title: string;
    assignable: boolean;
  };
}

export interface VideoCategoryResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: VideoCategory[];
}

export const videoCategoriesApi = youtubeApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchVideoCategories: builder.query<VideoCategoryResponse, void>({
      query: () => "videoCategories",
      providesTags: ["VideoCategories"],
    }),
  }),
});

export const { useFetchVideoCategoriesQuery } = videoCategoriesApi;
