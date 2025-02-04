import React, { useEffect, useState } from 'react';
import * as SliderPrimitive from '@radix-ui/react-slider';

import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';

interface SliderProps {
  id?: string;
  className?: string;
  defaultValue: number[];
  min: number;
  max: number;
  step: number;
  formatLabel: (val: number) => string;
  value: number[];
  onValueChange?: (val: number[]) => void;
}

const Slider = React.forwardRef(({ className, min, max, step, formatLabel, value, onValueChange, id, ...props }: SliderProps, ref) => {
  const initialValue = Array.isArray(value) ? value : [min, max];
  const [localValues, setLocalValues] = useState(initialValue);

  const handleValueChange = (newValues) => {
    setLocalValues(newValues);
    if (onValueChange) {
      onValueChange(newValues);
    }
  };

  return (
    <SliderPrimitive.Root
      id={id}
      ref={ref}
      min={min}
      max={max}
      step={step}
      value={localValues}
      onValueChange={handleValueChange}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-gray-400">
        <SliderPrimitive.Range className="absolute h-full bg-yellow-400" />
      </SliderPrimitive.Track>
      {localValues.map((value, index) => {
        let spanClass = "text-xs font-bold relative -top-[43px] "
        spanClass += value === 10 ? " left-[3px]" : " left-[7px]"
        return (
          <React.Fragment key={index}>
            <SliderPrimitive.Thumb
              className="block h-4 w-2 relative cursor-pointer rounded-md border-none bg-transparent shadow transition-colors disabled:pointer-events-none disabled:opacity-50"
            ><Star stroke='orange' size={35} className='relative -top-[12px] -left-2 ' fill='yellow' color='yellow' /><span className={spanClass + ' dark:text-black'}>{formatLabel ? formatLabel(value) : value}</span></SliderPrimitive.Thumb>
          </React.Fragment>
        )
      })}
    </SliderPrimitive.Root>
  );
});

Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };