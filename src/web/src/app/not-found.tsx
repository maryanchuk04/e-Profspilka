import Circles from '@/components/Circles';
import Container from '@/components/Container';
import MoveToButton from '@/ui/Buttons/MoveToButton';

export default function NotFound() {
    return (
        <Container className='relative h-screen'>
            <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col justify-center items-center'>
                <Circles>
                    <h1 className='text-white font-extrabold text-[10rem]'>404</h1>
                </Circles>
                <div className='mt-12'>
                    <p className='text-center'>упс... щось пішло не так</p>
                    <MoveToButton to='/' label='На головну' />
                </div>
            </div>
        </Container>
    );
}
