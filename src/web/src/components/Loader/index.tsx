'use client'

import { useMediaQuery } from '@/hooks';

const Loader = ({ className = '' }) => {
    const isSmScreen = useMediaQuery(400);

    return (
        <div className={`h-full w-full flex ${className}`}>
            <div
                className="loader m-auto"
                style={{
                    width: isSmScreen ? 130 : 180,
                    height: isSmScreen ? 130 : 180,
                    borderColor: '#0026F3 transparent transparent transparent',
                }}
            ></div>
        </div>
    );
};

export default Loader;
