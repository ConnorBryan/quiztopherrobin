import React from 'react';
import PropTypes from 'prop-types';

function ResultsScreen(props) {
    const { correctAnswerCount, restart } = props;

    return (
        <div>
            You got {correctAnswerCount}/10 correct.
            <button onClick={restart}>
                Restart
            </button>
        </div>
    );
}

ResultsScreen.propTypes = {};

ResultsScreen.defaultProps = {};

export default ResultsScreen;
