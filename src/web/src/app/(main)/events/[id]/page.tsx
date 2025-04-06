import { AxiosError } from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getEventById } from '@/apis/events';
import Container from '@/components/Container';
import Loader from '@/components/Loader';

type tParams = Promise<{ id: string }>;

export async function generateMetadata(props: { params: tParams }): Promise<Metadata> {
    const { id } = await props.params;
    if (!id)
        return {
            title: 'Подія не знайдена',
            description: 'Невідома подія',
        };

    try {
        const res = await getEventById(id);
        return {
            title: res?.title || 'Подія',
            description: res?.description?.slice(0, 150) || 'Опис події',
        };
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            return notFound();
        }
        return { title: 'Помилка', description: 'Не вдалося завантажити подію' };
    }
}

export default async function EventPage(props: { params: tParams }) {
    const { id } = await props.params;
    if (!id) return notFound();

    try {
        const event = await getEventById(id);

        return (
            <Container className='min-h-[40vh]'>
                <h1 className='text-black/60 uppercase m-0 p-0 cursor-pointer'>
                    <a href='/events'>#Актуальні новини та події</a>
                </h1>

                <h2 className='w-1/2 my-4'>{event.title}</h2>

                <div className='flex flex-wrap gap-4 my-4 justify-center'>
                    {event.images.map((image: string) => (
                        <div key={image} className='w-[30%] min-w-[240px] max-w-full h-[250px] flex-1'>
                            <img
                                src={image}
                                className='object-cover w-full h-full rounded-xl shadow'
                                alt={event.title}
                            />
                        </div>
                    ))}
                </div>

                <div className='no-tailwind event' dangerouslySetInnerHTML={{ __html: event.description }} />
            </Container>
        );
    } catch (error) {
        if (error instanceof AxiosError && error.response?.status === 400) {
            return notFound();
        }
        return notFound();
    }
}
