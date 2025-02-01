import { useAppDispatch } from "@/app/hooks"
import { logout } from "@/features/user/userSlice";

// Попап сделать. Точно хотите выйти? + кнопка в библиотеке - удалить все с попапом
export function Logout() {
    const dispatch = useAppDispatch();
    return (
        <div onPointerUp={() => dispatch(logout())} className="cursor-pointer">LOG OUT</div>
    )
}