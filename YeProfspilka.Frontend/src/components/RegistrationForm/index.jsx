import React from 'react'
import { useDispatch } from 'react-redux'
import { handleOpen } from '../../features/loginSlice'
import GoogleButton from '../../ui/Buttons/GoogleButton'
import PrimaryButton from '../../ui/Buttons/PrimaryButton'
import TextField from '../../ui/Fields/TextField'

const RegistrationForm = ({ className = "" }) => {
	const dispatch = useDispatch();

	const handleClick = () => {
		dispatch(handleOpen())
	}
	return (
		<div className={`my-3 w-full h-full flex flex-col justify-center ${className}`}>
			<h1 className='text-center w-full xs:text-xl sm:text-2xl md:text-3xl'>Зареєструватись<br /> в єПрофспілці</h1>
			<div className='mt-12 mb-6 flex flex-col gap-4'>
				<div className='w-full relative'>
					<TextField placeholder="Корп.пошта" className='xl:pr-40 xs:pr-20 max-sm:text-xs' />
					<p className='absolute text-black/25 xs:max-sm:text-xs top-1/2 -right-10 transform -translate-x-1/2 -translate-y-1/2'>@chnu.edu.ua</p>
				</div>
				<TextField placeholder="Пароль" type='password' />
				<PrimaryButton onClick={handleClick}>Зареєструватись</PrimaryButton>
				<p className='mb-4 text-black/50 font-ukraine text-center'>Ми не передаємо ваші дані третім особам</p>
				<div>
					<p className='text-center'>Увійти за один клік</p>
					<GoogleButton />
				</div>
			</div>

		</div>
	)
}

export default RegistrationForm