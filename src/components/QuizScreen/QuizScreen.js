import React from 'react';
import PropTypes from 'prop-types';

function QuizScreen(props) {
    const {
        answerQuestion,
        questions,
        activeQuestion
    } = props;

    if (activeQuestion >= questions.length) return null;

    const { question } = questions[activeQuestion];

    return (
        <div>
            {activeQuestion + 1}. {question}
            <button onClick={() => answerQuestion("True")}>
                True
            </button>
            <button onClick={() => answerQuestion("False")}>
                False
            </button>
        </div>
    );
}

QuizScreen.propTypes = {
    answerQuestion: PropTypes.func.isRequired,
    questions: PropTypes.arrayOf(PropTypes.object).isRequired,
    activeQuestion: PropTypes.number.isRequired
};

export default QuizScreen;
