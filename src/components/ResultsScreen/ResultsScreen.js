import React from 'react';
import PropTypes from 'prop-types';

function ResultsScreen(props) {
    const {
        restart,
        correctAnswerCount,
        answerResults
    } = props;

    return (
        <div>
            You got {correctAnswerCount}/10 correct.
            <section>
                {answerResults.map(answer => (
                    <div key={answer.key}>
                        <p>{answer.questionNumber}. {answer.question}</p>
                        <p>You got this question {answer.isCorrect ? 'right' : 'wrong'}.</p>
                        <p>Your answer: {answer.yourAnswer}</p>
                        <p>Correct answer: {answer.correctAnswer}</p>
                    </div>
                ))}
            </section>
            <button onClick={restart}>
                Restart
            </button>
        </div>
    );
}

ResultsScreen.propTypes = {
    restart: PropTypes.func.isRequired,
    correctAnswerCount: PropTypes.number.isRequired,
    answerResults: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ResultsScreen;
