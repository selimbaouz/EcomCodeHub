import React, { Suspense } from 'react';
import { PulseLoader } from 'react-spinners';

interface LoaderSpinnerProps {
    children: React.ReactNode;
}

const LoaderSpinner = ({children}: LoaderSpinnerProps) => {
  return (
    <Suspense
      fallback={
        <PulseLoader
          size={7}
          className='w-full h-[100dvh] flex'
          style={{
            alignItems: "center",
            justifyContent: "center"
          }}
        />}
    >
      {children}
    </Suspense>
  );
};

export default LoaderSpinner;