import { Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react";

export function ThemeSwitch() {
    const [darkMode, setDarkMode] = useState<boolean>(true);

    useEffect(() => {
        if (darkMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [darkMode]);

    return (
        <>
            <Button
                variant="ghost"
                size="icon"
                className="w-[24px] h-[24px] "
                onClick={() => setDarkMode((prevMode) => !prevMode)}
            >
                <Sun className="h-[1.5rem] w-[1.3rem] dark:hidden" />
                <Moon className="hidden h-5 w-5 dark:block" />
            </Button>
        </>
    )
}