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
  role: "admin" | "employee" | null;
}

const initialState: AuthState = {
  user: null,
  role: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<AuthUser>) {
      state.user = action.payload;
      state.role = action.payload.type;
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout(state) {
      state.user = null;
      state.role = null;
      localStorage.removeItem("user");
    },
    loadUserFromStorage(state) {
      const saved = localStorage.getItem("user");
      if (saved) {
        const parsed = JSON.parse(saved) as AuthUser;
        state.user = parsed;
        state.role = parsed.type;
      }
    },
  },
});

export const { setUser, logout, loadUserFromStorage } = authSlice.actions;
export default authSlice.reducer;
