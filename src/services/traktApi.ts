import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Обработать ошибки если их сервер лёг!
const API_URL = 'https://api.trakt.tv/';
const CLIENT_ID = import.meta.env.VITE_CLIENT_ID;


export const traktApi = createApi({
  reducerPath: 'traktApi',
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
      // Устанавливаем обязательные заголовки
      headers.set('Content-type', 'application/json');
      headers.set('trakt-api-key', CLIENT_ID); // Подставь свой client_id
      headers.set('trakt-api-version', '2');

      // // OAuth токен, добавляем заголовок авторизации
      // const token = (getState() as RootState).auth.accessToken;
      // if (token) {
      //   headers.set('Authorization', `Bearer ${token}`);
      // }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query<any, void>({
      query: () => ({
        //params: { extended: 'images' },
        url: 'movies/popular',
      })
    }),
  }),
})

export const {
  useGetPopularMoviesQuery,
} = traktApi
