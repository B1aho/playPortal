import { Moon, Sun } from "lucide-react"

export function ThemeBtnContent() {
    return (
        <>
            <span>
                <Sun className="h-[1.1rem] w-[1.1rem] dark:hidden" />
                <Moon className="hidden h-[1.1rem] w-[1.1rem] dark:block" />
            </span>
            <span>Switch theme</span>
        </>
    )
}