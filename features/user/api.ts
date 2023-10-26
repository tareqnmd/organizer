import apiSlice from '../api';
import { setUser } from './slice';

export const loginApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getUser: builder.query({
			query: (id) => ({
				url: `user/${id}`,
			}),
		}),
		userUpdate: builder.mutation({
			query: ({ id, data }) => ({
				url: `user/${id}`,
				method: 'PUT',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					const data = {
						name: result.data.name,
						email: result.data.email,
						userId: result.data._id,
						role: result.data.role,
						role_name: result.data.role_name,
						status: result.data.status,
						status_name: result.data.status_name,
					};
					dispatch(setUser(data));
				} catch (error) {}
			},
		}),
		userStatusUpdate: builder.mutation({
			query: ({ id, data }) => ({
				url: `user/${id}`,
				method: 'PUT',
				body: data,
			}),
			async onQueryStarted(arg, { queryFulfilled, dispatch }) {
				try {
					const result = await queryFulfilled;
					const data = {};
				} catch (error) {}
			},
		}),
	}),
});

export const {
	useGetUserQuery,
	useUserUpdateMutation,
	useUserStatusUpdateMutation,
} = loginApi;
