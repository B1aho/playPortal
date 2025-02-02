export interface Movie {
    title: string;
    year: number;
    ids: IDS;
    images: Images;
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