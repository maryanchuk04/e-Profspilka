import { getUserStatusLabel, isUserVerified } from '@/models/role';
import { CurrentUser } from '@/models/user';
import { LogoutButton } from '@/ui/Buttons/LogoutButton';

import Field from './Field';

interface ProfileInfoFieldsProps {
    currentUser: CurrentUser;
}

export const ProfileInfoFields = ({ currentUser }: ProfileInfoFieldsProps) => {
    const verified = isUserVerified(currentUser);
    const userStatusLabel = getUserStatusLabel(currentUser);

    return (
        <>
            <Field label='Статус:' text={verified ? 'Верифікований' : 'НЕ Верифікований'} />
            <Field label='Роль' text={userStatusLabel} />
            <Field label='Місце навчання:' text={currentUser.faculty || 'Невідомо'} />
            <Field label='Курс:' text={currentUser.course.toString() || 'Невідомо'} />
            <LogoutButton />
        </>
    );
};
