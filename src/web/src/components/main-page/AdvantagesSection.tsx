import { getAdvantages } from '@/apis/advanvages';
import { Advantage } from '@/models/advantage';

import AdvantagesCard from '../AdvantagesCard';
import Container from '../Container';

export default async function AdvantagesSection() {
    const data = await getAdvantages();

    return (
        <div className='bg-primary text-white py-12'>
        <Container>
            <h1>Переваги профспілкового членства</h1>
        </Container>

        <Container>
            <div className='relative flex flex-wrap gap-6 justify-center md:justify-between mx-auto'>
                <div className='w-24 h-24 bg-gray-300/30 absolute top-[10%] right-[10%] rounded-full hidden md:block'></div>
                <div className='w-32 h-32 bg-gray-300/30 absolute top-[45%] right-1/4 rounded-full hidden md:block'></div>

                {data?.map((item: Advantage) => (
                    <AdvantagesCard key={item.id} advantages={item} />
                ))}
            </div>
        </Container>
    </div>
    );
}
