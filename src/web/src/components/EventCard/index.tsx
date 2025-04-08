import Link from 'next/link';

import { Event } from '@/models/event';

interface EventCardProps {
    event: Event;
}

const EventCard = ({ event }: EventCardProps) => {
    const smStyles = 'max-sm:max-w-sm max-sm:h-52 max-sm:mb-3';

    const { id, title, shortDescription } = event;

    return (
        <Link
            href={`/events/${id}`}
            className={`relative flex-1 flex flex-col justify-between max-w-xs p-5 border border-black rounded-standard h-80 duration-150 cursor-pointer hover:text-white hover:bg-primary hover:border-primary ${smStyles}`}
            key={id}
        >
            <div className='flex justify-between flex-col h-full'>
                <h4 className='w-3/4'>{title}</h4>
                {shortDescription && (
                    <p className='max-sm:line-clamp-2 overflow-hidden text-ellipsis mb-1'>
                        {shortDescription}
                    </p>
                )}
            </div>
            <span className='absolute bottom-3 right-3 text-2xl'>&#8599;</span>
        </Link>
    );
};

export default EventCard;
