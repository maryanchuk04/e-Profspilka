import React from 'react'
import Barcode from 'react-barcode';

const BarcodeGenerator = ({ value }) => {

	const options = {
		value: value,
		background: "transparent",
	}

	return (
			<Barcode {...options} />
	)
}

export default BarcodeGenerator