import MailToLink from '../MailToLink';

export default function NotVerifiedBanner() {
    return (
        <div className='flex flex-col items-center justify-center'>
            <img src='/images/warning.png' alt='warning' />
            <h2 className='text-xl font-bold text-red-500 mt-4 text-center'>
                Вас не верифіковано, ви маєте обмежений доступ!
            </h2>
            <p className='text-center text-black/70'>
                Для того щоб зняти всі обмеження, будь ласка, зверніться до{' '}
                <MailToLink email='maksym.marianchuk@chnu.edu.ua'>адміністратора системи</MailToLink>
            </p>
        </div>
    );
}
