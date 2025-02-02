import { HoverCard, HoverCardContent, HoverCardTrigger } from "@radix-ui/react-hover-card";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Logout } from "./LogoutBtn";

interface HoverLoginBtnProps {
    isAuthenticated: boolean;
}
export function HoverLoginBtn({ isAuthenticated }: HoverLoginBtnProps) {
    const navigate = useNavigate();
    return (
        <>
            <HoverCard>
                <HoverCardTrigger>
                    {isAuthenticated ? <Logout /> : <Button variant="link" onPointerUp={() => navigate('/login')}>LOG IN</Button>}
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