import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserAuth } from '../../models/userAuth.model';

const initialState: UserAuth = {
    id: null,
};

const userAuthSlice = createSlice({
    name: 'userAuth',
    initialState,
    reducers: {
        setId: (state, action: PayloadAction<string>) => {
            state.id = action.payload;
        },
        clearId: (state) => {
            state.id = null;
        },
    },
});

export const { setId, clearId } = userAuthSlice.actions;
export default userAuthSlice.reducer;