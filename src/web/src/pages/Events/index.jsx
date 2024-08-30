import React from 'react';
import Container from '../../components/Container';
import EventCard from '../../components/EventCard';
import { useSelector } from 'react-redux';
import { selectEvents } from '../../features/eventsSlice';

const Events = () => {
    const events = useSelector(selectEvents);

    return events.length === 0 ? (
        <div className='h-96 grid place-items-center'>
            <h1 className='text-center text-3xl max-sm:text-2xl'>
                На данний момент подій немає! Але вони будуть найблищим часом! <br />
                Приготуйтесь, буде цікаво!
            </h1>
        </div>
    ) : (
        <Container>
            <p>#події</p>
            <h1 className='my-4 uppercase text-black/60'>#Актуальні події та новини профспілки</h1>
            <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                {events.map((item) => (
                    <EventCard key={item.id} event={item} />
                ))}
            </div>
        </Container>
    );
};

export default Events;
