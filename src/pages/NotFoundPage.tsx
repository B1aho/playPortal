import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"

export function NotFoundPage() {
    const navigate = useNavigate();
    const location = useLocation()

    useEffect(() => {
        if (!location.pathname.includes('404')) {
            navigate('/404');
        }
    }, [location, navigate]);

    return (
        <div>Not Found!</div>
    )
}