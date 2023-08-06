import React, { useState } from 'react';

const Accordion = ({ title, details }) => {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!open);
	};

	return (
		<div
			className='p-8 duration-200 pr-16 relative border border-standart border-black rounded-standart my-8 max-sm:p-4'
			onClick={toggle}
		>
			<h2 className='max-sm:pr-16'>{title}</h2>
			{open && <p className='mt-8'>{details}</p>}
			<i
				className={`${
					open && 'rotate-180'
				} fas fa-angle-down duration-300 absolute top-8 right-8 text-3xl`}
			></i>
		</div>
	);
};

export default Accordion;
