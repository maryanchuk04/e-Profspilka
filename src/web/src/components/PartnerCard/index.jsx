import React from 'react';

const PartnerCard = ({ partner }) => {
    const { mainText, subText, subTextLink, image } = partner;

    return (
        <div className='mx-1'>
            <div className='w-full h-64'>
                <img loading='lazy' src={image} alt={mainText} className='w-full h-full aspect-square' />
            </div>
            <p>{mainText}</p>
            <a href={subTextLink} className='text-black/60'>
                {subText}
            </a>
        </div>
    );
};

export default PartnerCard;
