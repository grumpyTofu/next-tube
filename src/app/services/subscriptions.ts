import { youtubeApi } from "./youtube";

export interface Subscription {
  kind: string;
  etag: string;
  id: string;
  snippet: {
    publishedAt: Date;
    channelTitle: string;
    title: string;
    description: string;
    resourceId: {
      kind: string;
      channelId: string;
    };
    channelId: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
  contentDetails: {
    totalItemCount: number;
    newItemCount: number;
    activityType: string;
  };
  subscriberSnippet: {
    title: string;
    description: string;
    channelId: string;
    thumbnails: {
      [key: string]: {
        url: string;
        width: number;
        height: number;
      };
    };
  };
}

export interface SubscriptionsResponse {
  kind: string;
  etag: string;
  nextPageToken: string;
  prevPageToken: string;
  pageInfo: {
    totalResults: number;
    resultsPerPage: number;
  };
  items: Subscription[];
}

export const subscriptionsApi = youtubeApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchSubscriptions: builder.query<SubscriptionsResponse, void>({
      query: () => "subscriptions",
      providesTags: ["Subscriptions"],
    }),
  }),
  overrideExisting: true,
});

export const { useFetchSubscriptionsQuery } = subscriptionsApi;
