import React from 'react';
import Barcode from 'react-barcode';

const BarcodeGenerator = ({ value, disabled }) => {
    const options = {
        value: value,
        displayValue: false,
        background: 'transparent',
    };

    return disabled ? (
        <div className='h-full relative w-fit'>
            <Barcode {...options} />
            <div className='h-full backdrop-blur-sm absolute top-0 left-0 w-full'></div>
        </div>
    ) : (
        <Barcode {...options} />
    );
};

export default BarcodeGenerator;
