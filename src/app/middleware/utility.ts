interface PreloadState {
    isAuthenticated: boolean
    username: string;
    errorName: string | null;
    isConfirmOldPassword: boolean;
    isPasswordWasChanged: boolean,
}

const CURRENT_USER_KEY = 'currUsername';

export const saveCurrUsername = (username: string) => {
    localStorage.setItem(CURRENT_USER_KEY, username);
}

export const clearCurrUsername = () => {
    localStorage.removeItem(CURRENT_USER_KEY);
}

// Не нужен весь объект - ТОЛЬКО username так получаем в initiastate в userSlice
export const getPreloadState = (): PreloadState => {
    const initState = {
        isAuthenticated: false,
        username: "",
        errorName: null,
        isConfirmOldPassword: false,
        isPasswordWasChanged: false,
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
        isConfirmOldPassword: false,
        isPasswordWasChanged: false,
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

export const checkLocalStoragePassword = (tryPassword: string) => {
    const currUsername = localStorage.getItem(CURRENT_USER_KEY);
    if (!currUsername) {
        throw new Error('No current username in storage')
    }
    const storedData = localStorage.getItem(currUsername);
    if (!storedData) {
        throw new Error('No data for current user')
    }
    const { password }: { password: string } = JSON.parse(storedData);
    return password === tryPassword;
}

export const saveUserToLocalStorage = (username: string, data: { username: string; password: string; }) => {
    try {
        localStorage.setItem(username, JSON.stringify(data));
    } catch (err) {
        throw new Error('Storage issue');
    }
};

// Учесть и поменять username для favs и currusername 
export const changeUsernameInLocalStorage = (username: string, newUsername: string) => {
    const storedString = localStorage.getItem(username)
    localStorage.setItem(CURRENT_USER_KEY, newUsername);
    if (storedString) {
        const newKey = newUsername;
        const userData: { username: string; password: string; } = JSON.parse(storedString);
        userData.username = newKey;
        localStorage.removeItem(username);
        localStorage.setItem(newKey, JSON.stringify(userData));
    } else {
        throw new Error('Current username data was not found!')
    }
    const favs = getStoredFavs(username);
    if (favs) {
        localStorage.removeItem(username + '%favs');
        localStorage.setItem(newUsername + '%favs', JSON.stringify([...favs]))
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

export const deleteAccountFromLocalStorage = () => {
    const currUsername = localStorage.getItem(CURRENT_USER_KEY);
    if (currUsername) {
        localStorage.removeItem(currUsername);
        localStorage.removeItem(currUsername + '%favs');
        localStorage.removeItem(CURRENT_USER_KEY);
    }

}