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

interface SelectSearchProps {
    value: string;
    setSearchType: (v: SearchType) => void;
}

export function SelectSearch({ value, setSearchType }: SelectSearchProps) {
    return (
        <Select value={value} onValueChange={(val: SearchType) => setSearchType(val)}>
            <SelectTrigger className="w-[150px] cursor-pointer absolute right-2 rounded-md hover:bg-slate-400 top-[2px] border-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Movies" />
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