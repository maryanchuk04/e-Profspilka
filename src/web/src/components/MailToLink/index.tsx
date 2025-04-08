import React from 'react';

export default function MailToLink({ email, children }: { email: string; children: React.ReactNode }) {
    const link = `mailto:${email}`;

    return (
        <a className='font-medium text-primary hover:underline' href={link}>
            {children}
        </a>
    );
}
