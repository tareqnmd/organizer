import { apiSlice } from '../api/apiSlice';
import { setUser } from '../user/userSlice';

export const loginApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `/login`,
				method: 'POST',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					const data = {
						fullName: result.data.fullName,
						username: result.data.username,
					};
					localStorage.setItem('user', JSON.stringify(data));
					dispatch(setUser(data));
				} catch (error) {}
			},
		}),
	}),
});

export const { useLoginMutation } = loginApi;
