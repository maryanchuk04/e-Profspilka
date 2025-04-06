import { CurrentUser } from '@/models/user';

import Avatar from '../Avatar';

interface UserDetailsProps {
    user: CurrentUser;
}

const UserDetails = ({ user }: UserDetailsProps) => {
    return (
        <section>
            {/* Mobile: only avatar */}
            <div className='md:hidden'>
                <Avatar src={user.picture} className='border border-black w-14 h-14' />
            </div>

            {/* Desktop: avatar + full name */}
            <div className='hidden md:flex h-[70px] rounded-standard border border-black items-center px-3'>
                <h2 className='mr-6 text-xl text-right'>{user.fullName}</h2>
                <Avatar src={user.picture} className='h-14 w-14' />
            </div>
        </section>
    );
};

export default UserDetails;
