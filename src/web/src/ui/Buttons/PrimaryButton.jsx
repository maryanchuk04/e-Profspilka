import React from 'react';

const PrimaryButton = ({ children, className = '', ...custom }) => {
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
