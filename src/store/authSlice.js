import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { authService } from "../services/APIService";

// Login with mobile (and name for new users)
export const loginWithMobile = createAsyncThunk(
    "auth/loginWithMobile",
    async ({ mobile, name }, { rejectWithValue }) => {
        try {
            const response = await authService.login(mobile, name);
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Login failed");
        }
    }
);

export const initializeAuth = createAsyncThunk(
  "auth/initializeAuth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");
      console.log("Token from localStorage:", token);
    //   if (token) {
    //     const decodedToken = jwtDecode(token);
    //     console.log("Decoded Token:", decodedToken);
    //     const user = {
    //       id: decodedToken.userId,
    //       mobile: decodedToken.mobile,
    //       name: decodedToken.name || "Unknown",
    //     };
    //     return { user, token };
    //   }
      if (token) {
        // Manual JWT decode: split by '.', take payload (second part), replace base64url chars, and atob
        const payload = token.split(".")[1];
        const decodedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
        const decoded = JSON.parse(atob(decodedPayload));
        console.log("Decoded Token (manual):", decoded);
        const user = {
          id: decoded.userId,
          mobileNumber: decoded.mobile, // Use mobileNumber to match selfUser structure
          name: decoded.name || "Unknown",
        };
        return { user, token };
      }
      return { user: null, token: null };
    } catch (err) {
      console.log("Error decoding token:", err);
      return rejectWithValue("Failed to initialize auth");
    }
  }
);


const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        token: localStorage.getItem("token") || null,
        loading: false,
        error: null,
    },
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem("token");
            localStorage.removeItem("user");
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Mobile login
            .addCase(loginWithMobile.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loginWithMobile.fulfilled, (state, action) => {
                state.loading = false;
                state.user = {
                    ...action.payload.user,
                    mobile: action.payload.user.mobile || action.payload.user.mobileNumber || ""
                };
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
                localStorage.setItem("user", JSON.stringify(state.user));
            })
            .addCase(loginWithMobile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(initializeAuth.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(initializeAuth.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload.user;
        state.token = action.payload.token;
        if (action.payload.user) {
          localStorage.setItem("user", JSON.stringify(action.payload.user));
        } else {
          localStorage.removeItem("user");
        }
      })
      .addCase(initializeAuth.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
    },
});

export const { logout, clearError } = authSlice.actions;
export default authSlice.reducer;