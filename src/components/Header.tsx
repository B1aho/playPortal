import { NavLink } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import { useAppSelector } from "@/app/hooks";
import { selectIsAuthenticated } from "@/features/user/userSlice";
import { Logout } from "./LogoutBtn";
import { HoverSignupBtn } from "./HoverSignupBtn";

export function Header() {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    return (
        <header className="sticky top-0 z-10">
            <div className="flex">
                <div>LOGO</div>
                <SearchInput />
                <div className="flex">
                    {isAuthenticated ? <Logout /> : <NavLink to='/login'>LOG IN</NavLink>}
                    <HoverSignupBtn isAuthenticated={isAuthenticated} />
                </div>
            </div>
        </header>
    )
}