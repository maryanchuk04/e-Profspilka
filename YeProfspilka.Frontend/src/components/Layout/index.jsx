import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { handleOpen, selectLoginState } from '../../features/loginSlice'
import RegistrationForm from '../RegistrationForm'
import SimpleModal from '../SimpleModal'

const Layout = ({ children }) => {
	const { open } = useSelector(selectLoginState);
	const dispatch = useDispatch();

	const handleClose = () => {
		dispatch(handleOpen());
	}

	return (
		<div className='relative min-h-screen h-full'>
			{children}
			{
				open && <SimpleModal handleClose={handleClose} >
					<RegistrationForm />
				</SimpleModal>
			}
		</div>
	)
}

export default Layout