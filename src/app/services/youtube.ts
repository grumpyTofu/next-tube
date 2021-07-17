// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import { createApi, fetchBaseQuery, retry } from "@reduxjs/toolkit/query/react";

// Create our baseQuery instance
const baseQuery = fetchBaseQuery({
  baseUrl: "/api",
});

const baseQueryWithRetry = retry(baseQuery, { maxRetries: 2 });

// initialize an empty api service that we'll inject endpoints into later as needed
export const youtubeApi = createApi({
  reducerPath: "youtube",
  baseQuery: baseQueryWithRetry,
  refetchOnFocus: false,
  tagTypes: ["Videos", "VideoCategories"],
  endpoints: () => ({}),
});
