import Transformations from '@/components/content/mode/Transformations';
import { cn } from '@/lib/utils';
import React from 'react';
import ContainerSnippet from '../ContainerSnippet';

const BeforeAfterSlider = () => {
    return (
        <ContainerSnippet>
            <div className={cn("mx-auto w-max")}>
                <Transformations />
            </div>
        </ContainerSnippet>
    );
};

export default BeforeAfterSlider;