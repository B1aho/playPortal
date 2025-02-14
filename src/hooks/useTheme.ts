import { useCallback, useEffect, useState } from "react";

export function useTheme() {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const toggleTheme = useCallback(() => {
        darkMode ? setDarkMode(false) : setDarkMode(true);
    }, [darkMode])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark-blue');
            document.documentElement.classList.remove('dark-red');
        } else {
            document.documentElement.classList.remove('dark-blue');
            document.documentElement.classList.add('dark-red');
        }
    }, [darkMode]);

    return toggleTheme
}