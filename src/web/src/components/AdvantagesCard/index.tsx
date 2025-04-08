import { Advantage } from '@/models/advantage';

interface AdvantagesCardProps {
    advantages: Advantage;
}

export default function AdvantagesCard({ advantages }: AdvantagesCardProps) {
    const { mainText, subText } = advantages;

    return (
        <div className='flex-1-sm w-80 max-sm:w-full h-56 flex flex-col bg-black rounded-standard p-6 max-sm:w-sm'>
            <p className='text-white/50 text-xl'>#{mainText}</p>
            <div className='mt-8'>
                <p className='text-white w-5/6'>{subText}</p>
            </div>
        </div>
    );
};