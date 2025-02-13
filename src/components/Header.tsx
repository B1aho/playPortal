import { SearchInput } from "./SearchInput";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import { HoverSignupBtn } from "./HoverSignupBtn";
import { HoverLoginBtn } from "./HoverLoginBtn";
import { useNavigate } from "react-router-dom";
import { Film } from "lucide-react";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";

export function Header() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const isMobile = useIsMobile();

    const navigate = useNavigate();
    return (
        <header className="bg-opacity-45 dark:bg-opacity-35  dark:bg-slate-950 sticky top-0 z-10 py-3">
            <div className="flex">
                <Button variant="link" className="cursor-pointer" onPointerUp={() => navigate('/main')}>
                    <Film />
                    {!isMobile && <span>Main page</span>}
                </Button>
                <SearchInput />
                <div className="flex">
                    {/* Объедини DRY*/}
                    <HoverLoginBtn isAuthenticated={isAuthenticated} />
                    <HoverSignupBtn isAuthenticated={isAuthenticated} />
                </div>
            </div>
        </header>
    )
}