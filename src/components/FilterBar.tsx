import { useRef } from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Check, RotateCcw } from "lucide-react";

interface FilterProps {
    tmdbMin: number;
    tmdbMax: number;
    setMin: React.Dispatch<React.SetStateAction<number>>,
    setMax: React.Dispatch<React.SetStateAction<number>>,
}

export function FilterBar({ tmdbMin, tmdbMax, setMin, setMax }: FilterProps) {
    const sliderMin = useRef(0);
    const sliderMax = useRef(10);

    const handleRatingChange = (val: number[]) => {
        const [newMin, newMax] = val;
        sliderMin.current = newMin;
        sliderMax.current = newMax;
    }

    const applyValues = () => {
        setMin(sliderMin.current);
        setMax(sliderMax.current);
    }

    const clearValue = () => {
        setMin(0);
        setMax(10);
    }
    return (
        <div className=" w-full rounded-md flex justify-center items-center p-3 bg-black bg-opacity-30 mb-3">
            <div className="w-full flex justify-start gap-10">
                <div className="flex w-1/2 justify-center items-center">
                    <Slider
                        id="rating-slider"
                        defaultValue={[0, 10]}
                        max={10}
                        min={0}
                        step={1}
                        value={[tmdbMin, tmdbMax]}
                        onValueChange={handleRatingChange}
                        formatLabel={(value) => `${value}`}
                    />
                </div>
                <div className="flex w-1/3  flex-col">
                    <div className="flex items-center justify-start gap-4">
                        <Button className="bg-yellow-200 hover:bg-amber-400 text-white hover:text-black bg-opacity-45 duration-200 hover:scale-110 transition-all ease-in-out " onPointerUp={applyValues}>
                            <Check />
                            <span className=" font-semibold">Apply</span>
                        </Button>
                        <RotateCcw className="cursor-pointer text-amber-400 duration-200 hover:scale-110 transition-all ease-in-out" size={30} onPointerUp={clearValue} />
                    </div>
                </div>
            </div>
        </div>
    )
}