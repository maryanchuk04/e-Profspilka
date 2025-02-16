import { getQuestions } from '@/apis/questions';

import Accordion from '../Accordion';

const fetchQuestions = async () => {
    try {
        const { data } = await getQuestions();
        return data;
    } catch (error) {
        console.error('An error occurred while fetching questions:', error);

        return [];
    }
};

export default async function TypicalQuestions() {
    const questions = await fetchQuestions();

    return (
        questions &&
        questions.length > 0 && (
            <div id='questions' className='my-32'>
                <h1 className='mb-12 max-sm:text-center'>Типові запитання</h1>
                <div>
                    {questions.map((item) => (
                        <Accordion key={item.id} title={item.questionText} details={item.answer} />
                    ))}
                </div>
            </div>
        )
    );
}
