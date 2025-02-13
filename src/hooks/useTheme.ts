import { useCallback, useEffect, useState } from "react";

export function useTheme() {
    const [darkMode, setDarkMode] = useState<boolean>(true);
    const toggleTheme = useCallback(() => {
        darkMode ? setDarkMode(false) : setDarkMode(true);
    }, [darkMode])

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return toggleTheme
}