import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import EventCard from '../../../components/EventCard';
import { selectEvents } from '../../../features/events.slice';
import Button from '../../../ui/Buttons/Button';

const Events = () => {
    const navigate = useNavigate();
    const events = useSelector(selectEvents);

    return (
        events &&
        events.length > 0 && (
            <div id='events' className='w-full my-4'>
                <h1 className='my-12 max-sm:text-center'>Актуальні новини</h1>
                <div className='flex w-full flex-wrap gap-2 justify-between my-6'>
                    {events.map((event) => (
                        <EventCard key={event.id} event={event} />
                    ))}
                </div>
                <div className='w-80 max-sm:w-full'>
                    <Button onClick={() => navigate('/events')}>
                        <div className='flex items-center justify-between px-3'>
                            <p>Всі події</p>
                            <span className='text-2xl'>&#8599;</span>
                        </div>
                    </Button>
                </div>
            </div>
        )
    );
};

export default Events;
