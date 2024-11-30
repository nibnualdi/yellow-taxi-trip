import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pickupCoor: "",
  dropOffCoor: "",
  isPickupCoorInputOnFocus: false,
  isDropOffCoorInputOnFocus: false,
};

export const tripHandlerSlice = createSlice({
  name: "tripHandler",
  initialState,
  reducers: {
    setPickupCoor: (state, action) => {
      state.pickupCoor = action.payload;
    },
    setDropOffCoor: (state, action) => {
      state.dropOffCoor = action.payload;
    },
    setIsPickupCoorInputOnFocus: (state, action) => {
      state.isPickupCoorInputOnFocus =
        action.payload === undefined ? !state.isPickupCoorInputOnFocus : action.payload;
    },
    setIsDropOffCoorInputOnFocus: (state, action) => {
      state.isDropOffCoorInputOnFocus =
        action.payload === undefined ? !state.isDropOffCoorInputOnFocus : action.payload;
    },
  },
});

export const {
  setPickupCoor,
  setDropOffCoor,
  setIsPickupCoorInputOnFocus,
  setIsDropOffCoorInputOnFocus,
} = tripHandlerSlice.actions;

export default tripHandlerSlice.reducer;
