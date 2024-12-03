import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const taxitripsApi = createApi({
  reducerPath: "taxitripsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/taxi-trips/" }),
  endpoints: (builder) => ({
    getTaxiTripByCoordinate: builder.query({
      query: ({ pickup_longitude, pickup_latitude, dropoff_longitude, dropoff_latitude }) => ({
        url: `coordinate`,
        method: "POST",
        body: {
          pickup_longitude,
          pickup_latitude,
          dropoff_longitude,
          dropoff_latitude,
        },
      }),
    }),
  }),
});

export const { useGetTaxiTripByCoordinateQuery } = taxitripsApi;
