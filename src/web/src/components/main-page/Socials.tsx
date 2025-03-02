import { getSocials } from '@/apis/socials';

export default function Socials() {
    const socials = getSocials();

    return (
        <div id='socials' className='my-20'>
            <h1>Ми в соцмережах</h1>
            <div className='flex flex-wrap my-5 justify-between gap-10 max-sm:flex-col'>
                {socials.map((item) => (
                    <a
                        href={item.link}
                        target='_blank'
                        key={item.link}
                        className='cursor-pointer flex-1 flex items-center border-2 border-primary text-black rounded-standard py-4 justify-center'
                        rel='noreferrer'
                    >
                        <i className={`${item.icon} text-4xl mr-4`}></i>
                        <p className='text-xl'>{item.text}</p>
                    </a>
                ))}
            </div>
        </div>
    );
}
