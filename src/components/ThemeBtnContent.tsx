import { Moon, Popcorn } from "lucide-react"

export function ThemeBtnContent() {
    return (
        <>
            <span>
                <Popcorn className="h-[1.1rem] w-[1.1rem] theme-blue:hidden" />
                <Moon className="theme-red:hidden h-[1.1rem] w-[1.1rem] theme-blue:block" />
            </span>
            <span>Switch theme</span>
        </>
    )
}