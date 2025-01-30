import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
} from "@/components/ui/hover-card"
import { useNavigate } from "react-router-dom";

interface HoverLinkProps {
    content: string;
    domen: string;
    desc: string;
    top?: number;
}

export function HoverLink({ content, domen, desc, top }: HoverLinkProps) {
    const navigate = useNavigate();
    const styles = 'relative cursor-pointer transition-all ease-in-out duration-300 hover:scale-110 ' + `top-[${top}px]`;
    return (
        <>
            <HoverCard>
                <HoverCardTrigger>
                    <span onPointerUp={() => navigate(domen)} rel="noopener noreferrer" className="relative">
                        <img
                            className={styles}
                            src={content}
                            width={40}
                            height={40}
                            alt="game-site-icon"
                        />
                    </span>
                </HoverCardTrigger>
                <HoverCardContent>
                    <span className="text-lg font-medium">Click the icon to discover the {desc}</span>
                </HoverCardContent>
            </HoverCard>
        </>
    )
}