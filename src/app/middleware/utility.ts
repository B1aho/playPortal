import { GameCardInfo, GameMinimalCardInfo } from "@/rawgTypes";

export const getStoredUser = (username: string) => {
    return JSON.parse(localStorage.getItem(username) || '{}');
};

export const getStoredFavs = (username: string) => {
    const favorites: GameMinimalCardInfo[] = JSON.parse(localStorage.getItem(username + 'favs') || '[]');
    return favorites ? favorites : [];
}

export const saveUserToLocalStorage = (username: string, data: object) => {
    try {
        localStorage.setItem(username, JSON.stringify(data));
    } catch (err) {
        throw new Error('Storage issue');
    }
};

export const omitGameInfo = (game: GameCardInfo): GameMinimalCardInfo => {
    return {
        slug: game.slug,
        name: game.name,
        background_image: game.background_image,
        rating: game.rating,
        released: game.released,
    }
}