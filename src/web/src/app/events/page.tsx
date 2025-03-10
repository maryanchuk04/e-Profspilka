import { getEvents as getEventsApi } from '@/apis/events';
import Container from '@/components/Container';
import EventCard from '@/components/EventCard';
import { Event } from '@/models/event';

async function getEvents(): Promise<Event[]> {
    try {
        const events = await getEventsApi();

        return events;
    } catch (error) {
        console.error('An error occurred while fetching events:', error);
        return [];
    }
}

export async function generateMetadata() {
    return {
        title: 'єПрофспілка - Події',
    };
}

export default async function EventsPage() {
    const events = await getEvents();

    if (events.length === 0) {
        return (
            <Container className='h-96 grid place-items-center'>
                <h1 className='text-center text-3xl max-sm:text-2xl'>
                    На даний момент подій немає! Але вони будуть найближчим часом! <br />
                    Приготуйтесь, буде цікаво!
                </h1>
            </Container>
        );
    }

    return (
        <Container>
            <p className='font-bold'>#події</p>
            <h1 className='my-4 uppercase text-black/60'>#Актуальні події та новини профспілки</h1>
            <div className='grid grid-cols-4 gap-3 max-lg:grid-cols-2 max-sm:grid-cols-1'>
                {events.map((event) => (
                    <EventCard key={event.id} event={event} />
                ))}
            </div>
        </Container>
    );
}
