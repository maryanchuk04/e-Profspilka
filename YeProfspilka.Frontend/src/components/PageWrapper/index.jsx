import React, { useEffect } from 'react'
import Footer from '../Footer'
import Header from '../Header'
import { useDispatch } from 'react-redux'
import { fetchDiscounts } from '../../features/discountSlice'

const PageWrapper = ({ element, withFooter = true }) => {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(fetchDiscounts());
	}, [])

	return (
		<div className='h-full'>
			<Header />
			{element}
			{withFooter && <Footer />}
		</div >

	)
}

export default PageWrapper