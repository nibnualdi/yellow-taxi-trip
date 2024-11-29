import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  pickupCoor: 0,
  dropOffCoor: 0,
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
  },
});

export const { setPickupCoor, setDropOffCoor } = tripHandlerSlice.actions;

export default tripHandlerSlice.reducer;
