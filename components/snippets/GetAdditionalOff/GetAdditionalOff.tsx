import { cn } from '@/lib/utils';
import React from 'react';
import ContainerSnippet from '../ContainerSnippet';
import styles from "./get-additional.module.css";

const GetAdditionalOff = () => {
    return (
        <ContainerSnippet>
            <div className={cn(styles.container)}>
                Bénéficiez de -15 % avec le code <strong>Spring</strong>
            </div>
        </ContainerSnippet>
    );
};

export default GetAdditionalOff;