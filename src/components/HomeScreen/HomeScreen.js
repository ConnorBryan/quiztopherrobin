import React from 'react';
import PropTypes from 'prop-types';

function HomeScreen(props) {
    const { start } = props;

    return (
        <div>
            <h2>
                Welcome to Quizza!
            </h2>
            <p>
                You will be presented with ten true/false questions. <br />
                Can you pass the trivia challenge with 100%?
            </p>
            <button onClick={start}>
                Start
            </button>
        </div>
    );
}

HomeScreen.propTypes = {
    start: PropTypes.func.isRequired
};

export default HomeScreen;
