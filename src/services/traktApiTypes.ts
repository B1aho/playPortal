export interface Movie {
    title: string;
    year: number;
    ids: IDS;
    images: Images;
}

export interface MovieDetail {
    title: string;
    year: number;
    ids: IDS;
    tagline: string;
    overview: string;
    released: Date;
    runtime: number;
    country: string;
    trailer: string;
    homepage: null;
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