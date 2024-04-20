import { configureStore } from "@reduxjs/toolkit";
import { createWrapper, HYDRATE } from "next-redux-wrapper";
import filterSlice from "./filtersSlice";

const makeStore = () =>
  configureStore({
    reducer: { filter: filterSlice.reducer },
  });

export const wrapper = createWrapper(makeStore, { debug: true });
