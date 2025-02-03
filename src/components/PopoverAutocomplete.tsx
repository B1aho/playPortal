import { Command as CommandPrimitive } from "cmdk";
import { KeyboardEventHandler, ReactNode, useCallback, useState } from "react";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandItem,
    CommandList,
} from "./ui/command";
import { Input } from "./ui/input";
import { Popover, PopoverContent } from "./ui/popover";
import { Skeleton } from "./ui/skeleton";
import { PopoverAnchor } from "@radix-ui/react-popover";
import { Movie } from "@/services/traktApiTypes";
import { MovieSearchCard } from "./MovieSearchCard";

type Props<T extends string> = {
    selectedValue?: T;
    onRedirect: () => void;
    onSelectedValueChange: (value: T) => void;
    searchValue: string;
    onSearchValueChange: (value: string) => void;
    items: (Movie | null)[] | undefined;
    isLoading?: boolean;
    emptyMessage?: string;
    placeholder?: string;
    children?: ReactNode;
};

export function AutoComplete<T extends string>({
    searchValue,
    children,
    onRedirect,
    onSearchValueChange,
    items,
    isLoading,
    emptyMessage = "No items.",
    placeholder = "Search...",
}: Props<T>) {
    const [open, setOpen] = useState(false);


    const handleKeyUp: KeyboardEventHandler<HTMLInputElement> = useCallback((e) => {
        if (e.key === 'Enter') {
            onRedirect();
            setOpen(false);
        }
    }, [onRedirect])

    return (
        <div className="flex items-center w-full">
            <Popover open={open}
                onOpenChange={setOpen}
            >
                <Command shouldFilter={false} className="relative">
                    <PopoverAnchor asChild>
                        <CommandPrimitive.Input
                            asChild
                            value={searchValue}
                            onValueChange={onSearchValueChange}
                            onKeyUp={handleKeyUp}
                            onFocus={() => setOpen(true)}
                            // onBlur={onInputBlur}
                            className="rounded-md shadow-inner bg-transparent py-4 h-11 text-sm outline-1 placeholder:text-muted-foreground"
                        >
                            <Input placeholder={placeholder} />
                        </CommandPrimitive.Input>
                    </PopoverAnchor>
                    {children}
                    {!open && <CommandList aria-hidden="true" className="hidden" />}
                    <PopoverContent
                        asChild
                        onOpenAutoFocus={(e) => e.preventDefault()}
                        onInteractOutside={(e) => {
                            if (e.target instanceof Element && (e.target.hasAttribute("cmdk-input") || e.target.closest("[cmdk-item]"))) {
                                e.preventDefault();
                            }
                        }}
                        className="w-[--radix-popover-trigger-width] p-0"
                    >
                        <CommandList>
                            {(isLoading) && (
                                <CommandPrimitive.Loading>
                                    <div className="p-1">
                                        <Skeleton className="h-6 w-full" />
                                    </div>
                                </CommandPrimitive.Loading>
                            )}
                            {(items && items.length > 0) && !isLoading ? (
                                <CommandGroup>
                                    {items.map((option) => {
                                        if (!option)
                                            return null
                                        return (
                                            <CommandItem
                                                key={option.ids.trakt}
                                            >
                                                <MovieSearchCard data={option} onSelect={() => setOpen(false)} />
                                            </CommandItem>
                                        )
                                    })}
                                </CommandGroup>
                            ) : null}
                            {!isLoading ? (
                                <CommandEmpty>{emptyMessage ?? "No items."}</CommandEmpty>
                            ) : null}
                        </CommandList>
                    </PopoverContent>
                </Command>
            </Popover>
        </div>
    );
}