import React from 'react';

const RefundGuarantees = () => {
    return (
        <div className='w-full rounded-2xl bg-[#e4f7f1] flex items-center gap-4 p-3 max-w-sm justify-center'>
            <img 
                src="/images/moneyBack.png"
                alt="Img of moneyback"
                width={100}
                height={100}
            />
            <div className='flex flex-col gap-2'>
                <h6 className="font-bold text-[12px] lg:text-[14px]">Remboursement Garantie Pendant 90 Jours</h6>
                <p className='text-[10px] lg:text-xs'>Nous avons confiancce en nos produits. Pas convaincu ? Renvoyez-le et nous vous rembourserons votre achat.</p>
            </div>
        </div>
    );
};

export default RefundGuarantees;