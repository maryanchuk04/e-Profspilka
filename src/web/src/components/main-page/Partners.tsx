import React from 'react';

import { getPartners } from '@/apis/partners';
import { Partner } from '@/models/partners';

export default async function Partners() {
    const partners: Partner[] = await getPartners();

    if (!partners?.length) return null;

    return (
        <section id='partners' className='mt-12'>
            <h1 className='mb-10'>Наші партнери 🤝</h1>

            <div className='flex flex-wrap gap-6 justify-center'>
                {partners.map((partner) => (
                    <div
                        key={partner.id}
                        className='relative w-full sm:w-[48%] md:w-[30%] xl:w-[22%] bg-white rounded-standard border border-black p-4 flex flex-col items-center'
                    >
                        <img
                            src={partner.image}
                            alt={partner.name}
                            className='default-app-logo-resolution mb-4'
                            loading='lazy'
                        />

                        <h3 className='text-lg font-semibold text-center text-gray-800 mb-2'>{partner.name}</h3>

                        <p className='text-sm text-gray-600 text-center mb-8'>{partner.description}</p>


                        {partner.webSiteUrl && (
                            <a
                                href={partner.webSiteUrl}
                                target='_blank'
                                rel='noopener noreferrer'
                                className='absolute bottom-4 right-4 h-8 w-8 flex items-center justify-center text-white bg-primary hover:bg-primary-dark rounded-full transition duration-300 hover:scale-105 shadow'
                                title='Перейти на сайт'
                            >
                                <span className='text-xl'>&#8599;</span>
                            </a>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}
