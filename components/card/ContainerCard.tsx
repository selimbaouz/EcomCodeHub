import { FC } from "react";

interface ContainerCardProps {
    children: React.ReactNode;
}

const ContainerCard: FC<ContainerCardProps> = ({children}) => {
    return (
        <div className="relative shadow-md shadow-black p-[1px] bg-gradient-to-b from-[#319795] to-[#2D3748]/50 rounded-3xl">
            {children}
        </div>
    );
};

export default ContainerCard;