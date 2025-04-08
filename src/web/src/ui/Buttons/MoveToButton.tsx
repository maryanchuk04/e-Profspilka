"use client";

import { useRouter } from 'next/navigation';

import PrimaryButton from '@/ui/Buttons/PrimaryButton';

const BackToMainButton = ({ to, label }: { to: string, label: string}) => {
    const router = useRouter();

    return (
        <PrimaryButton onClick={() => router.push(to)} className="mt-16">
            {label}
        </PrimaryButton>
    );
};

export default BackToMainButton;
