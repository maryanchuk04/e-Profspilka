import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';

import { getAccessToken } from '@/apis/token';
import { useAppDispatch } from '@/app/store';

import { selectAlertState } from '../../features/alert.slice';
import { fetchDiscounts } from '../../features/discount.slice';
import { handleOpen, selectLoginState } from '../../features/login.slice';
import { fetchUserThunk } from '../../features/user.slice';
import Alert from '../Alert';
import RegistrationForm from '../RegistrationForm';
import SimpleModal from '../SimpleModal';

const Layout = ({ children }) => {
    const { open } = useSelector(selectLoginState);
    const isMobile = useMediaQuery({ maxWidth: '480px' });
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
                    <RegistrationForm />
                </SimpleModal>
            )}
            {alert.open && <Alert text={alert.text} type={alert.type} duration={alert.duration} />}
        </div>
    );
};

export default Layout;
