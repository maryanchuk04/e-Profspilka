import { getUserStatusLabel, isUserVerified } from '@/models/role';
import { CurrentUser } from '@/models/user';
import Button from '@/ui/Buttons/Button';

import Field from './Field';

interface ProfileInfoFieldsProps {
    currentUser: CurrentUser;
}

export const ProfileInfoFields = ({ currentUser }: ProfileInfoFieldsProps) => {
    const verified = isUserVerified(currentUser);
    const userStatusLabel = getUserStatusLabel(currentUser);

    const logOut = async () => {
        'use server';
        console.log('wow');
    };


    return (
        <>
            <Field label='Статус:' text={verified ? 'Верифікований' : 'НЕ Верифікований'} />
            <Field label='Роль' text={userStatusLabel} />
            <Field label='Місце навчання:' text={currentUser.faculty || 'Невідомо'} />
            <Field label='Курс:' text={currentUser.course.toString() || 'Невідомо'} />
            <Button className='mb-3' onClick={logOut}>
                Вийти з профілю
            </Button>
        </>
    );
};