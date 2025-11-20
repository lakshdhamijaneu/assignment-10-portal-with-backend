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
}

const initialState: AuthState = {
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
    },
    logout(state) {
      state.user = null;
      localStorage.removeItem("user");
    },
    loadUserFromStorage(state) {
      const saved = localStorage.getItem("user");
      if (saved) {
        state.user = JSON.parse(saved);
      }
    },
  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
