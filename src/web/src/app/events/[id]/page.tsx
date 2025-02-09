import { Metadata } from 'next';

import { getEventById } from '@/apis/events';
import Container from '@/components/Container';

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
    if (!params?.id) return { title: "Подія не знайдена", description: "Невідома подія" };

    try {
        const event = await getEventById(params.id);
        return {
            title: event?.data?.title || "Подія",
            description: event?.data?.description?.slice(0, 150) || "Опис події",
        };
    } catch (error) {
        console.error("Помилка отримання мета-даних:", error);
        return { title: "Помилка", description: "Не вдалося завантажити подію" };
    }
}

export default async function EventPage({ params }: { params: { id: string } }) {
    if (!params?.id) return <p>Помилка: Невідома подія</p>;

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
        console.error("Помилка завантаження події:", error);
        return <p>Не вдалося завантажити подію. Спробуйте ще раз.</p>;
    }
}
