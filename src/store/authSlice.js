import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Simulate mobile login (replace with real API call)
export const loginWithMobile = createAsyncThunk(
    "auth/loginWithMobile",
    async (mobile, { rejectWithValue }) => {
        try {
            // Replace this with your backend API call
            // Example: const response = await axios.post("/api/login-mobile", { mobile });
            const response = { data: { token: "dummy-token", user: { mobile } } };
            return response.data;
        } catch (err) {
            return rejectWithValue(err.response?.data || "Login failed");
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
                state.user = action.payload.user;
                state.token = action.payload.token;
                localStorage.setItem("token", action.payload.token);
            })
            .addCase(loginWithMobile.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
