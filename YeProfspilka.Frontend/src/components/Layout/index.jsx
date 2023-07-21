import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useMediaQuery } from 'react-responsive'
import { selectAlertState } from '../../features/alertSlice'
import { fetchDiscounts } from '../../features/discountSlice'
import { handleOpen, selectLoginState } from '../../features/loginSlice'
import { fetchUserThunk } from '../../features/userSlice'
import { Token } from '../../services/TokenService'
import Alert from '../Alert'
import RegistrationForm from '../RegistrationForm'
import SimpleModal from '../SimpleModal'

const Layout = ({ children }) => {
	const { open } = useSelector(selectLoginState);
	const isMobile = useMediaQuery({ maxWidth: "480px" });
	const alert = useSelector(selectAlertState);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchDiscounts())
		if (Token.get()) {
			dispatch(fetchUserThunk());
		}
	}, [])

	const handleClose = () => {
		dispatch(handleOpen());
	}

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
}

export default Layout