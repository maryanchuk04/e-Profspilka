import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const VerifyDiscount = () => {
	const { discountId } = useParams();
	useEffect(() => {}, [discountId]);

	return <div></div>;
};

export default VerifyDiscount;
