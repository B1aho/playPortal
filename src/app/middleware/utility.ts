export const getStoredUser = (username: string) => {
    return JSON.parse(localStorage.getItem(username) || '{}');
};

export const getStoredFavs = (username: string) => {
    const favorites: string[] = JSON.parse(localStorage.getItem(username + '%favs') || '[]');
    return favorites;
}

export const saveUserToLocalStorage = (username: string, data: object) => {
    try {
        localStorage.setItem(username, JSON.stringify(data));
    } catch (err) {
        throw new Error('Storage issue');
    }
};