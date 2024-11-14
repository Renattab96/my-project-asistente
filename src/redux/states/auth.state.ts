import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Auth } from '../../models/auth.model';

const initialState: Auth = {
    token: null,
    role: null
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setToken: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
        },
        setRole: (state, action: PayloadAction<string>) => {
            state.role = action.payload;
        },
        clearAuth: (state) => {
            state.token = null;
        },
    },
});

export const { setToken, setRole, clearAuth } = authSlice.actions;
export default authSlice.reducer;