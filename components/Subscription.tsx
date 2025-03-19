"use client";
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { PulseLoader } from 'react-spinners';

const Subscription = () => {
    const [isLoading, setIsLoading] = useState(false);
    return (
        <div className={cn("w-full flex justify-between items-center")}>
            <div className={cn("space-y-2")}>
                <h6 className='font-light'>Plan actuel</h6>
                <h3 className={cn("font-bold text-2xl")}>Pack Pro</h3>
                <p></p>
                <p>Le prochain paiement de 34,95€ sera le Jan 1 2023</p>
            </div>
            <div>
                <Button
                    size="xl" 
                    variant="default"
                    onClick={() => undefined} 
                    disabled={isLoading}
                    className={cn("w-full font-medium")}
                >
                    {isLoading ? (
                    <PulseLoader
                        size={7}
                        color="white"
                    />) : (
                    "Annuler l'abonnement"
                    )}
                </Button>
            </div>
        </div>
    );
};

export default Subscription;