import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Dispatch, SetStateAction } from "react";

interface SelectSearchProps {
    value: string;
    onChange: Dispatch<SetStateAction<string>>;
}

export function SelectSearch({ value, onChange }: SelectSearchProps) {
    return (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger className="w-[150px] cursor-pointer absolute right-2 rounded-md hover:bg-slate-400 top-[2px] border-none focus:ring-0 focus:ring-offset-0">
                <SelectValue placeholder="Movies" />
            </SelectTrigger>
            <SelectContent>
                <SelectGroup>
                    <SelectLabel>Search in ...</SelectLabel>
                    <SelectItem value="movie">Movies</SelectItem>
                    <SelectItem value="show">Shows</SelectItem>
                    <SelectItem value="movie,show">Movies and shows</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    )
}