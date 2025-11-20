import { configureStore } from "@reduxjs/toolkit";

export const store = configureStore({
  reducer: {
    // we'll add slices here (auth, jobs, etc.)
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
