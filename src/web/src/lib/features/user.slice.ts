

import { getCurrentUserInfo } from '@/apis/user';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { AlertType } from '../../models/alert';
import { MemberStatus } from '../../models/member-status';
import { showDefaultAlert } from './alert.slice';

interface UserState {
    loading: boolean;
    data: {
        id: number | null;
        fullName: string | null;
        facultet: string | null;
        course: number;
        status: MemberStatus;
        avatar: string;
        role: MemberStatus;
        email: string;
    };
}

const initialState: UserState = {
    loading: false,
    data: {
        id: null,
        fullName: null,
        facultet: null,
        course: 2,
        status: MemberStatus.NotVerified,
        avatar: '',
        role: MemberStatus.NotVerified,
        email: '',
    },
};

const alert = {
    open: true,
    text: '',
    type: AlertType.Success,
    duration: 4000,
};

export const fetchUserThunk = createAsyncThunk(
    'user/fetchUser',
    async (_, { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const userResponse = await getCurrentUserInfo();

            return fulfillWithValue(userResponse.data);
        } catch (error) {
            dispatch(showDefaultAlert());
            return rejectWithValue(null);
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.data = { ...initialState.data };
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUserThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUserThunk.fulfilled, (state, action: PayloadAction<UserState['data']>) => {
                state.data = action.payload;
                state.loading = false;
            })
            .addCase(fetchUserThunk.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const selectUserData = (state: { user: UserState }) => state.user.data;

export const selectUserLoading = (state: { user: UserState }) => state.user.loading;

export const { logout } = userSlice.actions;

export default userSlice.reducer;