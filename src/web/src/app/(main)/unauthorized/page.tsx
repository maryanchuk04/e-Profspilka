import Container from '@/components/Container';
import MailToLink from '@/components/MailToLink';
import { SearchParamsProps } from '@/lib/pageParams';

export default async function UnauthorizePage({ searchParams }: SearchParamsProps) {
    const reasonCode = (await searchParams)?.reasonCode ?? null;

    let label = '';

    switch (reasonCode) {
        case 'domain_is_not_acceptable':
            label =
                'Ви не можете бути авторизовані в системі з цього домену. Вам потрібно використати корпоративну адресу з доменом chnu.edu.ua. ';
            break;

        case 'account_is_blocked':
            label = 'Ваш акаунт заблоковано. ';
            break;

        case 'google_auth_error':
            label = 'Виникла помилка під час авторизації через Google. ';
            break;

        case 'account_disabled':
            label = 'Ваш акаунт заблоковано! ';
            break;
        default:
            label = '';
            break;
    }

    console.log(reasonCode);

    return (
        <Container className='text-center text-xl flex flex-col justify-center items-center'>
            <img className='text-center' src='/images/warning.png' />
            <h1 className='text-black/60'>Упс... Виникла проблема під час вашої аутентифікації.</h1>
            {label && (
                <h4>
                    <span className='font-bold'>⚠️ Причина: </span>
                    {label}
                </h4>
            )}
            <h5>
                Якщо ви вважаєте, що це помилка, зверніться до{' '}
                <MailToLink email='maksym.marianchuk@chnu.edu.ua'>адміністратора системи</MailToLink>
            </h5>
        </Container>
    );
}
