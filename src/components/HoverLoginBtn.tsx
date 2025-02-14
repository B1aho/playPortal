import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Logout } from "./LogoutBtn";
import { useIsMobile } from "@/hooks/use-mobile";
import { LogIn } from "lucide-react";

interface HoverLoginBtnProps {
    isAuthenticated: boolean;
}
export function HoverLoginBtn({ isAuthenticated }: HoverLoginBtnProps) {
    const navigate = useNavigate();
    const isMobile = useIsMobile();

    return (
        <>
            <HoverCard>
                <HoverCardTrigger>
                    {isAuthenticated ? <Logout /> : <Button variant="link" onPointerUp={() => navigate('/login')}>
                        {isMobile ? <LogIn /> : "LOG IN"}
                    </Button>}
                </HoverCardTrigger>
                <HoverCardContent>
                    <span className="text-lg font-medium">
                        {isAuthenticated
                            ? 'Log out from your account!'
                            : 'Have an account? Log in!'}
                    </span>
                </HoverCardContent>
            </HoverCard>
        </>
    )
}