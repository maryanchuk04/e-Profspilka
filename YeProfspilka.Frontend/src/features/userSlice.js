import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AuthenticateService } from "../services/AuthenticateService";
import { googleAuthenticate } from "../services/GoogleAuth";
import { UserService } from "../services/UserService";
import { MemberStatus } from "../utils/memberStatus";
import { showAlert } from "./alertSlice";
import { HttpStatusCode } from "axios";

const initialState = {
	loading: false,
	data: {
		fullName: "",
		facultet: "",
		course: 2,
		status: MemberStatus.NOT_VERIFICATED,
		avatar: "",
	}
}

const authService = new AuthenticateService();
const userService = new UserService();
const alert = {
	open: true,
	text: "",
	type: "success",
	duratuion: 4000
}

export const googleAuthenticateThunk = createAsyncThunk(
	"user/authenticate",
	async (googleToken, { fulfillWithValue, rejectWithValue, dispatch }) => {
		try {
			const { data } = await googleAuthenticate(googleToken);
			const { name, picture, email, hd } = data;

			const status = await authService.authenticateGoogle({ name, picture, email, hd });
			
			if (status === HttpStatusCode.Created ) {
				alert.text = "Ваш аккаунт було успішно створено!"
				dispatch(showAlert(alert))
			} 

			if (status === HttpStatusCode.Ok) {
				alert.text = "З поверненням!"
				dispatch(showAlert(alert))
			}

			const userResponse = await userService.get();

			return fulfillWithValue(userResponse.data);
		} 
		catch (error) {
			alert.type = 'error';
			alert.text = "Щось пішло не так! :("
			dispatch(showAlert(alert))
			return rejectWithValue(null);
		}
	}
)

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {

	}, 
	extraReducers: {
		[googleAuthenticateThunk.pending]: (state) => {
			state.loading = true
		},
		[googleAuthenticateThunk.fulfilled]: (state, action) => {
			state.loading = false;
			state.data.fullName = action.payload.fullName;
			state.data.avatar = action.payload.avatar;
			state.data.status = action.payload.status;
			state.data.course = action.payload.course;
			state.data.facultet = action.payload.facultet;

		},
		[googleAuthenticateThunk.rejected]: (state) => {
			state.loading = false;
		}
	}
})

export const selectIsAuthorized = (state) => state.user.autorized;

export const selectUserData = (state) => state.user.data;

export default userSlice.reducer;
