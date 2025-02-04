import { useRef } from "react";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { Button } from "./ui/button";
import { Check, Eraser } from "lucide-react";

interface FilterProps {
    tmdbMin: number;
    tmdbMax: number;
    setMin: React.Dispatch<React.SetStateAction<number>>,
    setMax: React.Dispatch<React.SetStateAction<number>>,
}

export function FilterBar({ tmdbMin, tmdbMax, setMin, setMax }: FilterProps) {
    const sliderMin = useRef(0);
    const sliderMax = useRef(10);
    let key = 0;

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
        key++;
    }
    return (
        <div className=" w-full flex">
            <div className="w-1/2 flex flex-col gap-2">
                <Label htmlFor="rating-slider" >Choose film rating:</Label>
                <Slider
                    key={key}
                    id="rating-slider"
                    defaultValue={[0, 10]}
                    max={10}
                    min={0}
                    step={1}
                    value={[tmdbMin, tmdbMax]}
                    onValueChange={handleRatingChange}
                    formatLabel={(value) => `${value}`}
                />
                <div className="flex">
                    <Button onPointerUp={applyValues}>
                        <Check />
                        Apply
                    </Button>
                    <Button onPointerUp={clearValue}>
                        <Eraser color="red" />
                    </Button>
                </div>
            </div>
        </div>
    )
}