import { useAppDispatch } from "@/app/hooks"
import { logout } from "@/features/user/userSlice";

export function Logout() {
    const dispatch = useAppDispatch();
    return (
        <div onPointerUp={() => dispatch(logout())} className="cursor-pointer">LOG OUT</div>
    )
}