import { CurrentUser } from '@/models/user';

import Avatar from '../Avatar';
import { ProfileInfoFields } from './ProfileInfoFields';

export interface ProfileSidebarProps {
    currentUser: CurrentUser;
}

const ProfileSidebar = ({ currentUser }: ProfileSidebarProps) => {
    // const verified = isUserVerified(currentUser);

    return (
        <div className='w-full lg:w-1/4 relative'>
            <div className='flex justify-center lg:justify-between items-center'>
                <Avatar src={currentUser.picture} className='h-40 w-40 lg:h-56 lg:w-56' />
            </div>
            <ProfileInfoFields currentUser={currentUser} />
        </div>
    );
};

export default ProfileSidebar;
