'use client';
import { useState } from 'react';

interface SecureTextProps {
    text: string;
    withCopy?: boolean;
}

export const SecureText = ({ text, withCopy = false }: SecureTextProps) => {
    const [revealed, setRevealed] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleClick = () => {
        setRevealed((prev) => !prev);
    };

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(text);
            if (navigator.vibrate) {
                navigator.vibrate(100);
            }

            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Error when trying to copy text:', err);
        }
    };

    return (
        <span className='inline-flex items-center gap-2'>
            <span
                onClick={handleClick}
                className={`cursor-pointer text-sm transition-all duration-500 ease-in-out font-semibold px-2 py-1 rounded select-none ${
                    revealed
                        ? 'text-black bg-transparent blur-0 opacity-100'
                        : 'text-transparent bg-gray-400 blur-sm opacity-70 hover:opacity-90'
                }`}
            >
                {text}
            </span>

            {withCopy && revealed && (
                <button
                    onClick={handleCopy}
                    className='text-sm w-8 h-8 py-1 border bg-white/50 rounded-full hover:bg-white/50 transition'
                    type='button'
                >
                    {copied ? <i className='fa-solid fa-check'></i> : <i className='fa-solid fa-copy'></i>}
                </button>
            )}
        </span>
    );
};
