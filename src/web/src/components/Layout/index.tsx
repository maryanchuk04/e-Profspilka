"use client";

import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { getAccessToken } from '@/apis/token';
import { useMediaQuery } from '@/hooks';
import { useAppDispatch } from '@/lib/store';

import { selectAlertState } from '../../lib/features/alert.slice';
import { fetchDiscounts } from '../../lib/features/discount.slice';
import { handleOpen, selectLoginState } from '../../lib/features/login.slice';
import { fetchUserThunk } from '../../lib/features/user.slice';
import Alert from '../Alert';
import AuthenticationForm from '../AuthenticationForm';
import SimpleModal from '../SimpleModal';

const Layout = ({ children }) => {
    const { open } = useSelector(selectLoginState);
    const isMobile = useMediaQuery(480);
    const alert = useSelector(selectAlertState);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(fetchDiscounts());

        const token = getAccessToken();
        if (token) {
            dispatch(fetchUserThunk());
        }
    }, []);

    const handleClose = () => {
        dispatch(handleOpen());
    };

    return (
        <div className='relative min-h-screen h-full'>
            {children}
            {!isMobile && open && (
                <SimpleModal className='!h-fit !w-[30rem]' handleClose={handleClose}>
                    <AuthenticationForm />
                </SimpleModal>
            )}
            {alert.open && <Alert text={alert.text} type={alert.type} duration={alert.duration} />}
        </div>
    );
};

export default Layout;
