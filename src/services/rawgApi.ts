import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const rawgApi = createApi({
  reducerPath: 'rawgApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.rawg.io/api/' }),
  endpoints: (builder) => ({
    getGameDetaileById: builder.query({
      query: (id) => `games/${id}?key=182fe43f52474285bc2075377d1d2bdc`,
    }),
  }),
})

export const { useGetGameDetaileByIdQuery } = rawgApi
