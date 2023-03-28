import React, { useState } from 'react'
import Slider from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const Carousel = ({ children }) => {
	const [index, setIndex] = useState(0);
	console.log(index, setIndex)
	const settings = {
		dots: true,
		infinite: true,
		speed: 800,
		arrows: false,
		slidesToShow: 4,
		autoplay: true,
		autoplaySpeed: 5000,
		initialSlide: 0,
		pauseOnHover: true,
		afterChange: (i) => setIndex(i),
		appendDots: (dots) => <ul className='my-12'>{dots}</ul>,
		customPaging: (i) => (
			<li className='w-full'>
				<div className={`mt-8 rounded-full mx-4 h-2 ${i === index ? "w-5 bg-black ml-3" : "bg-[#D9D9D9] w-2"}`}>
				</div>
			</li>
		),
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3,
					infinite: true,
					dots: true
				}
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 2,
					initialSlide: 2
				}
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			},
			{
				breakpoint: 380,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				}
			}
		]
	}

	return (
		<Slider
			{...settings}
			className="gap-2"
		>
			{children}
		</Slider>
	)
}

export default Carousel