import React from 'react';

const ProductSocialProof = () => {
    return (
        <div className="flex items-center justify-center gap-2">
            <div className='flex items-center -space-x-2'>
                    <img
                        className="rounded-full size-8 lg:size-10 border-2 border-white dark:border-gray-800"
                        src="https://avatars.githubusercontent.com/u/89768406"
                        width={100}
                        height={100}
                        alt={`Avatar`}
                    />
                    <img
                        className="rounded-full size-8 lg:size-10 border-2 border-white dark:border-gray-800"
                        src="https://avatars.githubusercontent.com/u/59442788"
                        width={100}
                        height={100}
                        alt={`Avatar`}
                    />
                    <img
                        className="rounded-full size-8 lg:size-10 border-2 border-white dark:border-gray-800"
                        src="https://avatars.githubusercontent.com/u/59228569"
                        width={100}
                        height={100}
                        alt={`Avatar`}
                    />
            </div>
            <p className="text-[10px] lg:text-[12px]">Recommander par <span className="font-bold text-[#4abf8e]">+650</span>personnes</p>
        </div>
    );
};

export default ProductSocialProof;