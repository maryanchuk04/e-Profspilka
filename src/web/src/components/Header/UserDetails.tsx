import { CurrentUser } from '@/models/user';

import Avatar from '../Avatar';

interface UserDetailsProps {
    user: CurrentUser;
}

const UserDetails = ({ user }: UserDetailsProps) => {
    return (
        <div
            className='cursor-pointer flex h-[70px] rounded-standard lg:border border-black items-center px-3 w-fit max-w-xl'
        >
            <h3 className='mr-6 max-lg:hidden'>{user.fullName}</h3>
            <Avatar alt='user-picture' src={user.picture} className='h-14 w-14' />
        </div>
    );
};

export default UserDetails;
