import React from 'react';
import { useMediaQuery } from 'react-responsive';
import { BounceLoader } from 'react-spinners';

const Loader = ({ className = '' }) => {
    const isSmScreen = useMediaQuery({ maxWidth: '400px' });
    return (
        <div className={`h-full w-full flex ${className}`}>
            <BounceLoader
                size={isSmScreen ? 130 : 180}
                aria-label='Loading Spinner'
                data-testid='loader'
                className='m-auto'
                color='#0026F3'
            />
        </div>
    );
};

export default Loader;
