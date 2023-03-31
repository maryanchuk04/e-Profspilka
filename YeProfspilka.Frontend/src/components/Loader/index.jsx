import React from 'react'
import { BounceLoader } from 'react-spinners'

const Loader = ({ className = "" }) => {
	return (
		<div className={`h-full w-full flex ${className}`}>
			<BounceLoader
				size={180}
				aria-label="Loading Spinner"
				data-testid="loader"
				className="m-auto"
				color="#0026F3"
			/>
		</div>
	)
}

export default Loader