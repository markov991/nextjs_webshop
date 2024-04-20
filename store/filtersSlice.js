import { createSlice } from "@reduxjs/toolkit";

const filterSlice = createSlice({
  name: "filter",
  initialState: {
    pickedColor: ["red"],
    priceRange: [0, 240],
  },
  reducers: {
    changeColorFilterParams(state, action) {
      state.pickedColor = action.payload.pickedColor;
      // state.priceRange = action.payload.priceRange;
    },
    changePriceRangeParams(state, action) {
      state.priceRange = action.payload.priceRange;
    },
  },
});

export const filterSliceActions = filterSlice.actions;

export default filterSlice;
