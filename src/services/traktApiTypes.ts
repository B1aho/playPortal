import { useGetPopularMoviesQuery, useSearchMoviesQuery } from "./traktApi";

export interface Movie {
    title: string;
    year: number;
    ids: IDS;
    images?: Images;
    type?: string;
}

export interface SearchResponse {
    type: string;
    score: number;
    movie?: Movie;
    show?: Movie;
}

export interface CommonDetail {
    title: string;
    year: number;
    ids: IDS;
    tagline: string;
    overview: string;
    runtime: number;
    country: string;
    status: string;
    rating: number;
    votes: number;
    comment_count: number;
    updated_at: Date;
    language: string;
    languages: string[];
    available_translations: string[];
    genres: string[];
    certification: string;
}

export interface MovieDetail extends CommonDetail {
    released: Date;
    trailer: string;
    homepage: null;
}

export interface ShowDetail extends CommonDetail {
    first_aired: Date;
    airs: Airs;
    network: string;
    aired_episodes: number;
    trailer: null;
    homepage: string;
}

export interface Airs {
    day: string;
    time: string;
    timezone: string;
}

export interface IDS {
    trakt: number;
    slug: string;
    imdb: string;
    tmdb: number;
}

export interface Images {
    fanart: string[];
    poster: string[];
    logo: string[];
    clearart: string[];
    banner: string[];
    thumb: string[];
}

type SearchMoviesQueryHook = typeof useSearchMoviesQuery;
type GetPopularMoviesQueryHook = typeof useGetPopularMoviesQuery;

export type QueryHook = SearchMoviesQueryHook | GetPopularMoviesQueryHook;