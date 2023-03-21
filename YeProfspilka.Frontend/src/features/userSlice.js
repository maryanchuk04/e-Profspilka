import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	autorized: true,
	data: {
		pib: "Миколко Микола Миколайович",
		facultet: "Факультет математики та інформатики",
		course: 2,
		isVerificated: true,
		status: 0,
		avatar: "http://t2.gstatic.com/licensed-image?q=tbn:ANd9GcSStEXQ52SE6txqvnwfAyOZ-dt6fkkBqzcir0RaZkoG54dYK7UByieR90Nb18ON4rdZ6VyDNVuQdk1kXik",
		discounts: [
			{
				name: "Знижка 15% у Стриптиз клубі “Маямі”",
				code: "ada",
				isBlocked: false,
			},
			{
				name: "Знижка 15% у Стриптиз клубі “Маямі”",
				code: "ada",
				isBlocked: true,
			},
			{
				name: "Знижка 15% у Стриптиз клубі “Маямі”",
				code: "ada",
				isBlocked: true,
			},
		]
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
