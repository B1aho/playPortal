import { Url } from "url";
// change with prettier

interface CommonResponse<T> {
    count: number;
    next: Url | null;
    previous: Url | null;
    results: T[];
}

export type GamesResponse = CommonResponse<GameResults>
export type MovieResponse = CommonResponse<Movie>
export type ScreenshotsResponse = CommonResponse<Screenshot>


export interface Movie {
    id: number;
    name: string;
    preview: string;
    data: MovieData;
}

export interface MovieData {
    max: string;
}

export interface Screenshot {
    id: number;
    image: string;
    hidden: boolean;
    width: number;
    height: number;
}

export interface GameResults {
    id: number;
    slug: string;
    name: string;
    released: Date;
    tba: boolean;
    background_image: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    ratings_count: number;
    reviews_text_count: number;
    added: number;
    added_by_status: AddedByStatus;
    metacritic: number;
    playtime: number;
    suggestions_count: number;
    updated: Date;
    user_game: null;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: PlatformElement[];
    parent_platforms: ParentPlatform[];
    genres: Genre[];
    stores: Store[];
    clip: null;
    tags: Genre[];
    esrb_rating: EsrbRating;
    short_screenshots: ShortScreenshot[];
}

export interface GameCardInfo {
    id: number;
    slug: string;
    name: string;
    released: Date;
    background_image: string;
    short_screenshots: ShortScreenshot[];
    rating: number;
    metacritic: number;
}

export interface AddedByStatus {
    yet: number;
    owned: number;
    beaten: number;
    toplay: number;
    dropped: number;
    playing: number;
}

export interface EsrbRating {
    id: number;
    name: string;
    slug: string;
}

export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    domain?: string;
    language?: Language;
}

export enum Language {
    Eng = "eng",
}

export interface ParentPlatform {
    platform: EsrbRating;
}

export interface PlatformElement {
    platform: PlatformPlatform;
    released_at: Date;
    requirements_en: RequirementsEn | null;
    requirements_ru: null;
}

export interface PlatformPlatform {
    id: number;
    name: string;
    slug: string;
    image: string | null;
    year_end: number | null;
    year_start: number | null;
    games_count: number;
    image_background: string;
}

export interface RequirementsEn {
    minimum: string;
    recommended: string;
}

export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface ShortScreenshot {
    id: number;
    image: string;
}

export interface Store {
    id: number;
    store: Genre;
}


export interface GameDetailResponse {
    id: number;
    slug: string;
    name: string;
    name_original: string;
    description: string;
    metacritic: number | null;
    released: Date;
    tba: boolean;
    updated: Date;
    background_image: string;
    background_image_additional: string;
    website: string;
    rating: number;
    rating_top: number;
    ratings: Rating[];
    reactions: Reactions;
    added: number;
    added_by_status: AddedByStatus;
    playtime: number;
    screenshots_count: number;
    movies_count: number;
    creators_count: number;
    achievements_count: number;
    reddit_url: string;
    reddit_description: string;
    reddit_logo: string;
    ratings_count: number;
    metacritic_url: string;
    parents_count: number;
    additions_count: number;
    game_series_count: number;
    reviews_count: number;
    saturated_color: string;
    dominant_color: string;
    platforms: PlatformElement[];
    stores: GameStore[];
    developers: Common[];
    genres: Common[];
    tags: Common[];
    publishers: Common[];
    esrb_rating: EsrbRating;
    clip: null;
    description_raw: string;
}

export interface Common {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    domain?: string;
    language?: string;
}

export interface PlatformElement {
    platform: PlatformPlatform;
    released_at: Date;
    requirements: Reactions;
}

export interface Reactions {
}

export interface Rating {
    id: number;
    title: string;
    count: number;
    percent: number;
}

export interface GameStore {
    id: number;
    url: string;
    store: Common;
}
