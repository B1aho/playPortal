import { useRef } from "react";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Check, Eraser, RotateCcw } from "lucide-react";

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
        <div className=" w-full flex justify-center items-center p-3">
            <div className="w-full flex justify-evenly">
                <div className="flex w-1/3  flex-col">
                    <div className="flex items-center justify-start gap-5">
                        <Button className="bg-green-400 hover:bg-green-600 bg-opacity-45 duration-200 hover:scale-110 transition-all ease-in-out " onPointerUp={applyValues}>
                            <Check />
                            Apply
                        </Button>
                        <RotateCcw className="cursor-pointer duration-200 hover:scale-110 transition-all ease-in-out" color="green" size={30} onPointerUp={clearValue} />
                    </div>
                </div>
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
            </div>
        </div>
    )
}