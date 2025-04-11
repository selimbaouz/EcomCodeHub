import Transformations from '@/components/content/mode/Transformations';
import { cn } from '@/lib/utils';
import React from 'react';

const BeforeAfterSlider = () => {
    return (
        <div className={cn("mx-auto w-max")}>
            <Transformations />
        </div>
    );
};

export default BeforeAfterSlider;