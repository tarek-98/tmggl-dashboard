// src/features/map/mapSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  zoom: 1,
};

const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    increaseZoom: (state) => {
      if (state.zoom < 5) state.zoom += 1;
    },
    decreaseZoom: (state) => {
      if (state.zoom > 1) state.zoom -= 1;
    },
  },
});

export const { increaseZoom, decreaseZoom } = mapSlice.actions;
export default mapSlice.reducer;
