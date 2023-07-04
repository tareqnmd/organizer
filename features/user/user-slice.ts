import { AppState } from '@/app/store';
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
	name: null,
	email: null,
	userId: null,
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		setUser: (state, action) => {
			state.name = action.payload.name;
			state.email = action.payload.email;
			state.userId = action.payload.userId;
		},
		removeUser: (state) => {
			state.name = null;
			state.email = null;
			state.userId = null;
		},
	},
});

export const { setUser, removeUser } = userSlice.actions;
export const getUserState = (state: AppState): typeof initialState =>
	state.user;
export default userSlice;
