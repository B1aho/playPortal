import { Common } from "@/rawgTypes"
import { useNavigate } from "react-router-dom";

interface TagsProps {
    tags: Common[];
}

export function Tags({ tags }: TagsProps) {
    const navigate = useNavigate();
    return (
        <>
            {tags.map((tag) => {
                return <span
                    key={tag.id}
                    className="font-normal opacity-70 ml-1 cursor-pointer transition ease-in-out duration-300 hover:underline hover:-translate-y-1 hover:scale-110 hover:opacity-100"
                    onPointerDown={() => navigate(`/games/tag/${tag.slug}`)}
                >
                    {tag.name}
                </span>
            })}
        </>
    )
}