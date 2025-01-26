import { useEffect } from "react";
import { useNavigate } from "react-router-dom"

export function useRedirectIfAuth(isAuth: boolean) {
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth)
            navigate('/main');
    }, [isAuth, navigate]);
}