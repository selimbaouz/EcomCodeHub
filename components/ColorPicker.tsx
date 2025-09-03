"use client";
import { cn } from '@/lib/utils';
import { useColorStore } from '@/store/useColor';
import React, { useEffect, useRef, useState } from 'react';
import { SketchPicker } from 'react-color';
import { CiPickerEmpty } from 'react-icons/ci';

const ColorPicker = () => {
  const { color, setColor } = useColorStore();
  const [isOpen, setIsOpen] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);

   useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed z-50 bottom-8 right-6 flex items-center justify-center"
      )}
    >
      <div ref={pickerRef} className="relative">
        <button
          className="flex justify-center items-center size-14 rounded-full border-2 border-gray-200 hover:scale-105 transition-transfor shadow-lg"
          style={{ background: color?.hex ?? "#333" }}
          onClick={() => setIsOpen(!isOpen)}
        >
            <CiPickerEmpty className='text-2xl text-white mix-blend-exclusion' />
        </button>

        {isOpen && (
          <div className="absolute bottom-full mb-2 right-0 z-50">
            <SketchPicker
              color={color?.hex ?? "#333"}
              onChange={(data) => setColor(data)}
              disableAlpha
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ColorPicker;
