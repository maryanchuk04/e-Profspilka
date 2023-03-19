import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

const PageWrapper = ({ element }) => {
	return (
		<div className='h-full'>
			<Header />
			{element}
			<Footer />
		</div >

	)
}

export default PageWrapper