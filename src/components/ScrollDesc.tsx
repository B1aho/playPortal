import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface ScrollDescProps {
    desc: string;
}

export function ScrollDesc({ desc }: ScrollDescProps) {
    return <ScrollArea className="rounded-md dark:bg-black dark:bg-opacity-35 border p-4 h-48 w-[82%]">
        <h2 className="font-bold text-lg underline">Description</h2>
        {desc}
        <ScrollBar />
    </ScrollArea>
}