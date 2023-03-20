import React from 'react'

const Container = ({ children, className = "" }) => {
	return (
		<div className={`container xs:w-11/12 mx-auto ${className} `}>
			{children}
		</div>
	)
}

export default Container