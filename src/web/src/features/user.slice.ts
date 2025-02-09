import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { showAlert, showDefaultAlert } from './alert.slice';
import { HttpStatusCode } from 'axios';
import { handleOpen } from './login.slice';
import { AlertType } from '../models/alert';
import { MemberStatus } from '../models/member-status';
import { authenticateGoogle, googleDataProvider } from '@/apis/auth';
import { getCurrentUserInfo } from '@/apis/user';

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

export const googleAuthenticateThunk = createAsyncThunk(
    'user/authenticate',
    async (googleToken: string, { fulfillWithValue, rejectWithValue, dispatch }) => {
        try {
            const googleResponse = await googleDataProvider(googleToken);

            const { name, picture, email, hd } = googleResponse;
            const { data, status } = await authenticateGoogle({
                name,
                picture,
                email,
                hd,
            });

            if (status === HttpStatusCode.Created) {
                alert.text = 'Ваш аккаунт було успішно створено!';
                dispatch(showAlert(alert));
            }

            if (status === HttpStatusCode.Ok) {
                alert.text = 'З поверненням!';
                dispatch(showAlert(alert));
            }

            dispatch(fetchUserThunk(data.token));

            dispatch(handleOpen());
            return fulfillWithValue(null);
        } catch (error) {
            alert.type = AlertType.Error;
            alert.text = 'Щось пішло не так! :(';
            dispatch(showAlert(alert));
            return rejectWithValue(null);
        }
    }
);

export const fetchUserThunk = createAsyncThunk(
    'user/fetchUser',
    async (token: string, { fulfillWithValue, rejectWithValue, dispatch }) => {
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
            .addCase(googleAuthenticateThunk.pending, (state) => {
                state.loading = true;
            })
            .addCase(googleAuthenticateThunk.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(googleAuthenticateThunk.rejected, (state) => {
                state.loading = false;
            })
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