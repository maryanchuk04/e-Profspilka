import { useSelector } from 'react-redux';

import Accordion from '../../../components/Accordion';
import { selectQuestions } from '../../../lib/features/questions.slice';

const TipicalQuestions = () => {
    const questions = useSelector(selectQuestions);

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
};

export default TipicalQuestions;
