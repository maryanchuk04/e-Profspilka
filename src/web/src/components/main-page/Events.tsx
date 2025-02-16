import { getEvents } from '@/apis/events';
import { Event } from '@/models/event';
import LinkButton from '@/ui/Buttons/LinkButton';

import EventCard from '../EventCard';

const fetchEvents = async (): Promise<Event[]> => {
    try {
        const { data } = await getEvents();
        return data;
    } catch (error) {
        console.error('An error occurred while fetching events:', error);
        return [];
    }
}

export default async function Events () {
    const events = await fetchEvents();

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
                    <LinkButton href='/events'>
                        <div className='flex items-center justify-between px-3'>
                            <p>Всі події</p>
                            <span className='text-2xl'>&#8599;</span>
                        </div>
                    </LinkButton>
                </div>
            </div>
        )
    );
};
