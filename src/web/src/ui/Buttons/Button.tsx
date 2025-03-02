import { ButtonHTMLAttributes } from 'react';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: React.ReactNode;
    className?: string;
}

const Button = ({ children, className = '', ...custom }: ButtonProps) => {
    return (
        <button
            className={`w-full h-12 bg-white text-black border border-black text-base font-regular rounded-standard xl:h-14 max-sm:text-sm duration-150 hover:bg-black/10 ${className}`}
            {...custom}
        >
            {children}
        </button>
    );
};

export default Button;
