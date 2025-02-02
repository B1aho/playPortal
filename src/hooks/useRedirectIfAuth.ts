import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { useToast } from "./use-toast";

export function useRedirectIfAuth(isAuth: boolean) {
    const navigate = useNavigate();
    const { toast } = useToast();

    useEffect(() => {
        if (isAuth) {
            navigate('/main');
            toast({
                title: "Success!",
                description: "You have successfully logged in",
            });
        }

    }, [isAuth, navigate]);
}