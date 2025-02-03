import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const API_KEY = import.meta.env.VITE_API_KEY;

export const tmdbApi = createApi({
    reducerPath: 'tmdbApi',
    baseQuery: fetchBaseQuery({
        baseUrl: 'https://api.themoviedb.org/3/',
    }),
    endpoints: (builder) => ({
        getTmdbMovieImages: builder.query({
            query: ({ type, tmdbMovieId }) => ({
                url: `${type}/${tmdbMovieId}/images`,
                params: {
                    api_key: API_KEY,
                },
            }),
        }),
    }),
});

// Экспорты для использования в компонентах
export const { useGetTmdbMovieImagesQuery } = tmdbApi;