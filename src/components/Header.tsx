import { NavLink } from "react-router-dom";
import { SearchInput } from "./SearchInput";
import { SidebarTrigger } from '../components/ui/sidebar';


export function Header() {
    return (
        <header className="">
            <div className="flex">
                <SidebarTrigger />
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