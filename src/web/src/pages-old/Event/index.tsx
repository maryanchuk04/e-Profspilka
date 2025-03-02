import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { getEventById } from '@/apis/events';

import Container from '../../components/Container';
import Loader from '../../components/Loader';

const Event = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [event, setEvent] = useState(null);

    useEffect(() => {
        (async () => {
            const { data } = await getEventById(id);
            setEvent(data);
        })();
    }, []);

    return !event ? (
        <Loader />
    ) : (
        <Container className='min-h-[40vh]'>
            <h1 className='text-black/60 uppercase m-0 p-0 cursor-pointer' onClick={() => navigate('/events')}>
                #Актуальні новини та події
            </h1>
            <h2 className='w-1/2 my-4'>{event.title}</h2>
            <div className='grid grid-cols-auto gap-4 my-4 place-items-center max-lg:grid-cols-2 max-sm:grid-cols-1'>
                {event.images.map((image) => (
                    <div key={image} className='h-96'>
                        <img src={image} loading='lazy' className='object-cover w-full h-full' />
                    </div>
                ))}
            </div>
            <div className='no-tailwind event' dangerouslySetInnerHTML={{ __html: event.description }}></div>
        </Container>
    );
};

export default Event;
