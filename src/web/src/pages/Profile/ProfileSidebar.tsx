import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import { useNavigate } from 'react-router-dom';

import { logout as logoutApi } from '@/apis/auth';
import { removeAccessToken } from '@/apis/token';
import { useAppDispatch } from '@/lib/store';
import { MemberStatus } from '@/models/member-status';

import Avatar from '../../components/Avatar';
import { logout, selectUserData } from '../../lib/features/user.slice';
import Button from '../../ui/Buttons/Button';
import Field from './Field';

const ProfileSidebar = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const media = useMediaQuery({ maxWidth: '976px' });
    const { fullName, facultet, course, avatar, role } = useSelector(selectUserData);
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(!isOpen);
    };

    const logOut = () => {
        logoutApi().then(() => {
            removeAccessToken();
            dispatch(logout());
            navigate('/');
        });
    };

    const checkUserVerificated = (role) => {
        return (
            role === MemberStatus.Student ||
            role === MemberStatus.MemberProfspilka ||
            role === MemberStatus.Admin ||
            role === MemberStatus.Moderator
        );
    };

    const checkUserStatus = (status) => {
        switch (status) {
            case 1:
                return 'Студент';
            case 2:
            case 3:
            case 4:
            case 5:
                return 'Член профспілки';
        }
    };

    return !media ? (
        <div className='w-1/4 relative'>
            <div className='flex justify-between'>
                <Avatar src={avatar} className='h-56 w-56' />
            </div>

            <Field label='П.І.Б:' text={fullName} />
            {role !== MemberStatus.NotVerified && <Field label='Роль' text={checkUserStatus(role)} />}
            <Field label='Місце навчання:' text={facultet || 'Невідомо'} />
            <Field label='Курс:' text={course || 'Невідомо'} />
            <Field label='Статус:' text={checkUserVerificated(role) ? 'Верифікований' : 'НЕ Верифікований'} />
            <Button onClick={logOut}>Вийти з профілю</Button>
        </div>
    ) : (
        <div
            className={`${
                checkUserVerificated(role) ? 'bg-[#F1E5C4]' : 'bg-[#b2b2b2]'
            }  flex flex-col rounded-standart max-sm:p-2 p-4 pb-1`}
            onClick={handleOpen}
        >
            <div className='flex justify-between items-center mb-2'>
                <Avatar className='h-auto w-full mr-2 max-sm:max-w-[5rem] max-lg:max-w-[8rem]' src={avatar} />
                <div className='w-3/4 relative'>
                    <p className='mt-3'>П.І.Б</p>
                    <h1 className='text-lg'>{fullName}</h1>
                </div>
            </div>
            <i
                className={`text-xl text-center mt-2 animate-bounce ${
                    !isOpen ? 'fa-solid fa-circle-down' : 'fa-solid fa-circle-up'
                } `}
            ></i>
            {isOpen && (
                <div>
                    <Field label='Статус:' text={checkUserVerificated(role) ? 'Верифікований' : 'НЕ Верифікований'} />
                    {role !== MemberStatus.NotVerified && <Field label='Роль' text={checkUserStatus(role)} />}
                    <Field label='Місце навчання:' text={facultet || 'Невідомо'} />
                    <Field label='Курс:' text={course || 'Невідомо'} />
                    <Button className='mb-3' onClick={logOut}>
                        Вийти з профілю
                    </Button>
                </div>
            )}
        </div>
    );
};

export default ProfileSidebar;
