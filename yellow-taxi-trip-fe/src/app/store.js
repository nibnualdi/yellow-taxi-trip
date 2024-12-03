import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { mapboxApi } from "../services/mapbox";
import tripHandlerReducer from "../features/tripHandler/tripHandlerSlice";
import { taxitripsApi } from "../services/taxitrips";

export const store = configureStore({
  reducer: {
    tripHandler: tripHandlerReducer,
    [mapboxApi.reducerPath]: mapboxApi.reducer,
    [taxitripsApi.reducerPath]: taxitripsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mapboxApi.middleware).concat(taxitripsApi.middleware),
});

setupListeners(store.dispatch);
