import React from 'react'
import Accordion from '../../../components/Accordion'


const TipicalQuestions = () => {
	const questions = [
		{
			title: "Хто такий Профорг??",
			details: "Профорг – це обраний студентами групи представник профспілки у академічній групі. Профгрупорг проводить свою роботу під керівництвом голови профспілкової організації студентів факультету/інституту/коледжу (профбюро студентів). Профгрупорг обирається серед членів профспілки групи на профспілкових зборах групи відкритим голосуванням за наявності на засіданні не менше двох третин членів профспілки групи терміном на 1 рік."
		},
		{
			title: "Хто такий Профорг?",
			details: "Профорг – це обраний студентами групи представник профспілки у академічній групі. Профгрупорг проводить свою роботу під керівництвом голови профспілкової організації студентів факультету/інституту/коледжу (профбюро студентів). Профгрупорг обирається серед членів профспілки групи на профспілкових зборах групи відкритим голосуванням за наявності на засіданні не менше двох третин членів профспілки групи терміном на 1 рік."
		},
	]

	return (
		<div id='questions' className='my-16'>
			<h1 className='mb-12 max-sm:text-center'>Типові питання</h1>
			<div>
				{
					questions.map((item) => (
						<Accordion key={item.title} title={item.title} details={item.details} />
					))
				}
			</div>
		</div>
	)
}

export default TipicalQuestions