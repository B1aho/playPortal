import { NavLink } from "react-router-dom";
import { SearchInput } from "./SearchInput";

export function Header() {
    return (
        <header className="">
            <div className="flex">
                <div>LOGO</div>
                <SearchInput />
                <div className="flex">
                    <NavLink to='/login'>LOG IN</NavLink>
                    <NavLink to='/signup'>SIGN UP</NavLink>
                    <NavLink to='/lib'>Library</NavLink>
                </div>
            </div>
        </header>
    )
}