import apiSlice from '../api';

export const typeApi = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getOptions: builder.query({
			query: (url) => ({
				url: url,
			}),
		}),
	}),
});

export const { useGetOptionsQuery } = typeApi;
