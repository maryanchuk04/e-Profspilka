import React from 'react';
import { useSelector } from 'react-redux';

import { selectPartners } from '../../lib/features/partners.slice';
import Carousel from '../Carousel';
import PartnerCard from '../PartnerCard';

const Partners = () => {
    const partners = useSelector(selectPartners);

    return (
        partners &&
        partners.length > 0 && (
            <div id='partners' className='my-12'>
                <h1>Наші партнери</h1>
                <Carousel>
                    {partners.map((item) => (
                        <PartnerCard key={item.id} partner={item} />
                    ))}
                </Carousel>
            </div>
        )
    );
};

export default Partners;
