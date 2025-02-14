import { useAppDispatch } from "@/app/hooks"
import { logout } from "@/features/user/userSlice";
import { Button } from "./ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogOut } from "lucide-react";

export function Logout() {
    const isMobile = useIsMobile();
    const dispatch = useAppDispatch();
    return (
        <Button variant="link" onPointerUp={() => dispatch(logout())} className="cursor-pointer">
            {isMobile ? <LogOut /> : 'LOG OUT'}
        </Button>
    )
}