import { AxiosError } from 'axios';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

import { getEventById } from '@/apis/events';
import Container from '@/components/Container';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    if (!params?.id)
        return {
            title: 'Подія не знайдена',
            description: 'Невідома подія',
        };

    try {
        const { data } = await getEventById(params.id);
        return {
            title: data?.title || 'Подія',
            description: data?.description?.slice(0, 150) || 'Опис події',
        };
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
                return notFound();
            }
        }
        return { title: 'Помилка', description: 'Не вдалося завантажити подію' };
    }
}

export default async function EventPage({ params }: { params: { id: string } }) {
    if (!params?.id) return notFound();

    try {
        const { data: event } = await getEventById(params.id);

        return (
            <Container className='min-h-[40vh]'>
                <h1 className='text-black/60 uppercase m-0 p-0 cursor-pointer'>
                    <a href='/events'>#Актуальні новини та події</a>
                </h1>
                <h2 className='w-1/2 my-4'>{event.title}</h2>
                <div className='grid grid-cols-auto gap-4 my-4 place-items-center max-lg:grid-cols-2 max-sm:grid-cols-1'>
                    {event.images.map((image: string) => (
                        <div key={image} className='h-96'>
                            <img src={image} loading='lazy' className='object-cover w-full h-full' />
                        </div>
                    ))}
                </div>
                <div className='no-tailwind event' dangerouslySetInnerHTML={{ __html: event.description }}></div>
            </Container>
        );
    } catch (error) {
        if (error instanceof AxiosError) {
            if (error.response?.status === 400) {
                return notFound();
            }
        }
        return notFound();
    }
}
