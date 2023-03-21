import React from 'react'
import Footer from '../Footer'
import Header from '../Header'

const PageWrapper = ({ element, withFooter = true }) => {
	return (
		<div className='h-full'>
			<Header />
			{element}
			{withFooter && <Footer />}
		</div >

	)
}

export default PageWrapper