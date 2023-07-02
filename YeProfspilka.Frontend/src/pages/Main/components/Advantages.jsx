import React from 'react';
import { useSelector } from 'react-redux';
import { useMediaQuery } from 'react-responsive';
import AdvantagesCard from '../../../components/AdvantagesCard';
import Container from '../../../components/Container';
import { selectAdvantages } from '../../../features/advantagesSlice';
import PrimaryButton from '../../../ui/Buttons/PrimaryButton';

const Advantages = () => {
	const smCount = 4;
	const isSmMedia = useMediaQuery({ maxWidth: '480px' });
	const advantages = useSelector(selectAdvantages);

	return (
		advantages &&
		advantages.length > 0 && (
			<div className='mt-12'>
				<div
					id='advantages'
					className='relative bg-primary w-full left-0 text-white mt-3 py-6 z-0'
				>
					<Container>
						<div className='w-32 h-32 bg-[#D3D3D3]/30 absolute top-[10%] right-[10%] rounded-full z-10'></div>
						<div className='w-40 h-40 bg-[#D3D3D3]/30 absolute top-[45%] right-1/4 rounded-full'></div>
						<h1 className='my-12 max-md:text-center'>
							Переваги профспілкового
							<br />
							членства
						</h1>
						<div className='relative flex flex-wrap gap-12 w-full justify-between my-10 z-20'>
							{isSmMedia
								? advantages
										.slice(smCount)
										.map((item) => (
											<AdvantagesCard key={item.id} advantages={item} />
										))
								: advantages.map((item) => (
										<AdvantagesCard key={item.id} advantages={item} />
								))}
						</div>
						{isSmMedia && (
							<PrimaryButton className='border border-white'>
								<div className='relative'>
									Переглянути Всі
									<span className='absolute right-3 text-2xl top-1/2 left-1/2 transform  -translate-y-1/2'>
										&#8599;
									</span>
								</div>
							</PrimaryButton>
						)}
					</Container>
				</div>
			</div>
		)
	);
};

export default Advantages;
