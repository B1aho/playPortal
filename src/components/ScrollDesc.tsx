import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

interface ScrollDescProps {
    desc: string;
}

export function ScrollDesc({ desc }: ScrollDescProps) {
    return <ScrollArea className="rounded-md border p-4 h-52 w-5/6">
        <h2 className="font-bold text-lg">Description</h2>
        {desc}
        <ScrollBar />
    </ScrollArea>
}