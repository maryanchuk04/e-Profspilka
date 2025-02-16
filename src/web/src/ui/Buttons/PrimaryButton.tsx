import React, { ButtonHTMLAttributes, ReactNode } from 'react';

interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: ReactNode;
    className?: string;
}

const PrimaryButton: React.FC<PrimaryButtonProps> = ({ children, className = '', ...custom }: PrimaryButtonProps) => {
    return (
        <button
            className={`w-full h-12 text-base font-regular rounded-standart xl:h-14 max-sm:text-sm bg-primary text-white ${className}`}
            {...custom}
        >
            {children}
        </button>
    );
};

export default PrimaryButton;
