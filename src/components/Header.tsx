import { SearchInput } from "./SearchInput";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import { HoverSignupBtn } from "./HoverSignupBtn";
import { HoverLoginBtn } from "./HoverLoginBtn";
import { useNavigate } from "react-router-dom";

export function Header() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const navigate = useNavigate();
    return (
        <header className="sticky top-0 z-10">
            <div className="flex">
                <div className="cursor-pointer" onPointerUp={() => navigate('/main')}>LOGO</div>
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