import { NavLink } from "react-router-dom";
import { SearchBar } from "./SearchBar";

export function Header() {
    return (
        <header>
            <div className="flex">
                <div>LOGO</div>
                <SearchBar />
                <div className="flex">
                    <NavLink to='/login'>LOG IN</NavLink>
                    <NavLink to='/signup'>SIGN UP</NavLink>
                    <NavLink to='/lib'>Library</NavLink>
                </div>
            </div>
        </header>
    )
}