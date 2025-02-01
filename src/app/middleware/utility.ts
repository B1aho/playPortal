interface PreloadState {
    isAuthenticated: boolean
    username: string;
    errorName: string | null;
}

const CURRENT_USER_KEY = 'currUsername';

export const saveCurrUsername = (username: string) => {
    localStorage.setItem(CURRENT_USER_KEY, username);
}

export const clearCurrUsername = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
}

export const getPreloadState = (): PreloadState => {
    const initState = {
        isAuthenticated: false,
        username: "",
        errorName: null,
    }
    const currUsername = localStorage.getItem(CURRENT_USER_KEY);
    if (!currUsername) {
        return initState;
    }
    const storedData = localStorage.getItem(currUsername);
    if (!storedData) {
        return initState;
    }
    const { username } = JSON.parse(storedData);
    return {
        errorName: null,
        isAuthenticated: true,
        username: username,
    }
}

export const getPreloadFavs = (): string[] => {
    const currUsername = localStorage.getItem(CURRENT_USER_KEY);
    if (!currUsername) {
        return [];
    }
    const favs = localStorage.getItem(currUsername + '%favs');
    if (favs)
        return JSON.parse(favs);
    else
        return [];
}

export const getStoredUser = (username: string) => {
    return JSON.parse(localStorage.getItem(username) || '{}');
};

export const getStoredFavs = (username: string) => {
    const favorites: string[] = JSON.parse(localStorage.getItem(username + '%favs') || '[]');
    return favorites;
}

export const saveUserToLocalStorage = (username: string, data: { username: string; password: string; }) => {
    try {
        localStorage.setItem(username, JSON.stringify(data));
    } catch (err) {
        throw new Error('Storage issue');
    }
};

export const changeUsernameInLocalStorage = (username: string, newUsername: string) => {
    const storedString = localStorage.getItem(username)

    if (storedString) {
        const newKey = newUsername;
        const newValue = JSON.parse(storedString); // сохраняем старое значение

        localStorage.removeItem(username);
        localStorage.setItem(newKey, JSON.stringify(newValue));
    } else {
        throw new Error('Current username data was not found!')
    }
};

export const changePasswordInLocalStorage = (username: string, newPassword: string) => {
    const storedString = localStorage.getItem(username)

    if (storedString) {
        const userData: { username: string; password: string; } = JSON.parse(storedString);
        userData.password = newPassword;
        localStorage.setItem(username, JSON.stringify(userData));
    } else {
        throw new Error('Storage issue')
    }

};