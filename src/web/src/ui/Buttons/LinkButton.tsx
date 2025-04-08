'use client'

import { useRouter } from 'next/navigation';

import Button, { ButtonProps } from './Button';

interface LinkButtonProps extends ButtonProps {
    href: string;
    scroll?: boolean;
}

export default function LinkButton({ href, children, className = '', scroll = false }: LinkButtonProps) {
    const router = useRouter();

    const handleClick = (e: React.MouseEvent) => {
        e.preventDefault();
        router.push(href, { scroll });
    };

    return (
        <Button className={className} onClick={handleClick}>
            {children}
        </Button>
    );
}
