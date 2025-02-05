import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import notFoundAnim from '@/lottie/404.json';
import Lottie from "lottie-react";
import { Button } from "@/components/ui/button";

export function NotFoundPage() {
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (!location.pathname.includes('404')) {
            navigate('/404');
        }
    }, [location, navigate]);

    return (
        <div className="w-full h-full flex flex-col gap-20 items-center justify-center">
            <Lottie className="w-[40%]" animationData={notFoundAnim} />
            <Button onPointerUp={() => navigate('/main')}
                className="w-1/4 bg-white  bg-opacity-10  text-xl font-bold">
                MAIN PAGE
            </Button>
        </div>
    )
}