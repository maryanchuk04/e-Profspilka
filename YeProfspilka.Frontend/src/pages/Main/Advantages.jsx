import React from 'react'
import { useSelector } from 'react-redux'
import AdvantagesCard from '../../components/AdvantagesCard'
import Container from '../../components/Container'
import { selectAdvantages } from '../../features/advantagesSlice'

const Advantages = () => {
	const advantages = useSelector(selectAdvantages);

	return (
		<div className='h-[700px] mt-3'>
			<div className='absolute bg-primary w-full left-0 text-white mt-3 py-6 z-0'>
				<Container className='relative'>
					<div className='w-32 h-32 bg-[#D3D3D3]/30 absolute top-[10%] right-[10%] rounded-full z-10'></div>
					<div className='w-40 h-40 bg-[#D3D3D3]/30 absolute top-[45%] right-1/4 rounded-full'></div>
					<h1>Переваги членства<br /> в профспілці</h1>
					<div className='relative flex flex-wrap gap-12 w-full justify-between my-10 z-20'>
						{
							advantages.map((item) => (
								<AdvantagesCard key={item.tag} advantages={item} />
							))
						}
					</div>
				</Container>
			</div>
		</div>

	)
}

export default Advantages