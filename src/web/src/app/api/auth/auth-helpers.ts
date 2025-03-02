import { getServerSession } from 'next-auth';

import { CurrentUser } from '@/models/user';

import { authOptions } from './[...nextauth]/route';

export const getServerCurrentUser = async (): Promise<CurrentUser | null> => {
    const session = await getServerSession(authOptions);

    if (!session?.user)
        return null;

    return session?.user as CurrentUser;
};
