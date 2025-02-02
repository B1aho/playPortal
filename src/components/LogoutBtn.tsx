import { useAppDispatch } from "@/app/hooks"
import { logout } from "@/features/user/userSlice";
import { Button } from "./ui/button";

// Попап сделать. Точно хотите выйти? + кнопка в библиотеке - удалить все с попапом
export function Logout() {
    const dispatch = useAppDispatch();
    return (
        <Button variant="link" onPointerUp={() => dispatch(logout())} className="cursor-pointer">LOG OUT</Button>
    )
}