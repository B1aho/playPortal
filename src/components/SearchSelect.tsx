import { SearchType } from "@/app/searchTypeContext";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { CircleEllipsis } from "lucide-react";

interface SelectSearchProps {
    value: string;
    setSearchType: (v: SearchType) => void;
}

export function SelectSearch({ value, setSearchType }: SelectSearchProps) {
    return (
        <Select value={value} onValueChange={(val: SearchType) => setSearchType(val)}>
            <SelectTrigger className="w-3 md:w-[150px] dark:text-white cursor-pointer border-none absolute right-2 bg-amber-400 md:bg-transparent rounded-md transition-hover duration-200 ease-in-out hover:bg-yellow-600 hover:scale-105 top-[2px] focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Movies" className="hidden md:block" />
                <CircleEllipsis className="block md:hidden" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Search in ...</SelectLabel>
                    <SelectItem value="movie">Movies</SelectItem>
                    <SelectItem value="show">Shows</SelectItem>
                    <SelectItem value="movie,show">Movies and shows</SelectItem>
                    <SelectItem disabled value="episode">Episodes</SelectItem>
                    <SelectItem disabled value="people">People</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}