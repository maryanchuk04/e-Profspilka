import { createSlice } from "@reduxjs/toolkit";
import { MemberStatus } from "../utils/memberStatus";

const initialState = {
	autorized: true,
	data: {
		pib: "Миколко Микола Миколайович",
		facultet: "Факультет математики та інформатики",
		course: 2,
		status: MemberStatus.NOT_VERIFICATED,
		avatar: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSStEXQ52SE6txqvnwfAyOZ-dt6fkkBqzcir0RaZkoG54dYK7UByieR90Nb18ON4rdZ6VyDNVuQdk1kXik",
	}
}

const userSlice = createSlice({
	name: 'user',
	initialState: initialState,
	reducers: {

	}
})

export const selectIsAuthorized = (state) => state.user.autorized;

export const selectUserData = (state) => state.user.data;

export default userSlice.reducer;
