import React, { useState } from 'react';

const Accordion = ({ title, details }) => {
	const [open, setOpen] = useState(false);

	const toggle = () => {
		setOpen(!open);
	};

	return (
		<div
			className='p-6 duration-200 border border-standart border-black rounded-standart my-8 max-sm:p-4'
			onClick={toggle}
		>
			<h2 className='text-xl relative w-full pr-8 max-sm:text-lg'>
				{title}
				<i
					className={`${
						open && 'rotate-180'
					} fas fa-angle-down duration-300 text-3xl absolute top-1/2 right-0 transform -translate-x-1/2 -translate-y-1/2`}
				></i>
			</h2>
			{open && (
				<div className='mt-8 pr-12'>
					<p
						onClick={(e) => e.stopPropagation()}
						className='editor'
						style={{ paddingRight: '30px' }}
						dangerouslySetInnerHTML={{ __html: details }}
					></p>
				</div>
			)}
		</div>
	);
};

export default Accordion;
