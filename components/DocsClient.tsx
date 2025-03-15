"use client";
import React from 'react';
import PlansModal from './modals/PlansModal';
import { useModalStore } from '@/store/plans';
import Plans from './Plans';

const DocsClient = ({children}: {children: React.ReactNode;}) => {
    const {isModal, setIsModal } = useModalStore();
    
    return (
        <div> 
            {children}
            {isModal && (
                <PlansModal 
                    isOpen={isModal}
                    onClose={setIsModal}
                >
                    <Plans />
                </PlansModal>
            )}
        </div>
    );
};

export default DocsClient;