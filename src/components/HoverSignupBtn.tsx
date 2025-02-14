import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

interface HoverSignupBtnProps {
    isAuthenticated: boolean;
}
export function HoverSignupBtn({ isAuthenticated }: HoverSignupBtnProps) {
    const navigate = useNavigate();
    return (
        <>
            <HoverCard>
                <HoverCardTrigger>
                    <Button disabled={isAuthenticated ? true : false} variant="link" onPointerUp={() => navigate('/signup')}>
                        SIGN UP
                    </Button>
                </HoverCardTrigger>
                <HoverCardContent>
                    <span className="text-lg font-medium">
                        {isAuthenticated
                            ? 'To create a new account, you first need to log out of your current one!'
                            : 'Create your personal account!'}
                    </span>
                </HoverCardContent>
            </HoverCard>
        </>
    )
}