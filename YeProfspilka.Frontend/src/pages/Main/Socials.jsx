import React from 'react'

const Socials = () => {
	const socials = [
		{
			icon: "fa-brands fa-instagram",
			text: "instagram",
			link: "https://www.instagram.com/studprofkom.cv.ua/",
		},
		{
			icon: "fa-brands fa-facebook",
			text: "facebook",
			link: "https://www.instagram.com/studprofkom.cv.ua/",
		},
		{
			icon: "fa-brands fa-instagram",
			text: "facebook",
			link: "https://www.instagram.com/studprofkom.cv.ua/",
		},
	]

	return (
		<div className='flex flex-wrap my-12 justify-between gap-10'>
			{
				socials.map((item) => (
					<a href={item.link} target='_blanck' key={item.text} className="cursor-pointer flex-1 flex items-center border-2 border-primary text-black rounded-standart p-4 px-8">
						<i className={`${item.icon} text-4xl mr-4`}></i>
						<p className='text-xl'>{item.text}</p>
					</a>
				))
			}
		</div>
	)
}

export default Socials