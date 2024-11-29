import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import { mapboxApi } from "../services/mapbox";
import tripHandlerReducer from "../features/tripHandler/tripHandlerSlice";

export const store = configureStore({
  reducer: {
    tripHandler: tripHandlerReducer,
    [mapboxApi.reducerPath]: mapboxApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(mapboxApi.middleware),
});

setupListeners(store.dispatch);
