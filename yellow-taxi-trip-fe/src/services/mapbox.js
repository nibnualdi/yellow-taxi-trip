import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const mapboxApi = createApi({
  reducerPath: "mapboxApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://api.mapbox.com/" }),
  endpoints: (builder) => ({
    getDirections: builder.query({
      query: ({ profile, coordinates }) =>
        `directions/v5/${profile}/${coordinates}?access_token=${
          import.meta.env.VITE_MAPBOX_ACCESSTOKEN
        }`,
    }),
  }),
});

export const { useGetDirectionsQuery } = mapboxApi;
