import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface AuthUser {
  _id: string;
  fullName: string;
  email: string;
  imagePath: string | null;
  type: "admin" | "employee";
}

interface AuthState {
  user: AuthUser | null;
  loading: boolean; // <-- ADD THIS
}

const initialState: AuthState = {
  user: null,
  loading: true, // <-- initially loading
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.loading = false; // login finished
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
      state.loading = false;
    },
    loadUserFromStorage(state) {
      const saved = localStorage.getItem("user");
      if (saved) {
        state.user = JSON.parse(saved);
      }
      state.loading = false;
    },
  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
