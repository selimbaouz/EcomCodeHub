import React from 'react';

interface ContainerSnippetProps {
    children: React.ReactNode;
}
const ContainerSnippet = ({children}: ContainerSnippetProps) => {
    return (
        <div className='size-full flex justify-center items-center'>
            {children}
        </div>
    );
};

export default ContainerSnippet;