import { useNavigate } from "react-router-dom";

interface CategoryProps {
    categories: string[];
    redirect?: "tag" | "genre" | "platform" | "developer";
}

export function CategoryLinks({ categories, redirect }: CategoryProps) {
    const navigate = useNavigate();
    return (
        <>
            {categories.map((cat, idx) => {
                return <span
                    key={idx}
                    className="font-normal opacity-70 mr-1.5 cursor-pointer transition ease-in-out duration-300 hover:underline hover:-translate-y-1 hover:scale-110 hover:opacity-100"
                // onPointerDown={() => navigate(`/games/${redirect}/${redirect === "platform" ? cat.id : cat.slug}`)}
                >
                    {cat}{idx !== categories.length - 1 ? ',' : null}
                </span>
            })}
        </>
    )
}