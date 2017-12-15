import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Icon } from "semantic-ui-react";

import "./QuizScreen.css";

function QuizScreen(props) {
  const { answerQuestion, questions, activeQuestion } = props;

  if (!questions[activeQuestion]) return null;

  const { question } = questions[activeQuestion];

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
            <Card.Header as="h4">
                Question {activeQuestion + 1} / {questions.length}
            </Card.Header>
        </Card.Content>
        <Card.Content textAlign="center">
          <Card.Description className="QuizScreen-question">
            {question}
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              positive
              className="fancy"              
              onClick={() => answerQuestion("True")}>
              <Icon name="checkmark" /> True
            </Button>
            <Button.Or />
            <Button
              negative
              className="fancy"
              onClick={() => answerQuestion("False")}>
              <Icon name="remove" /> False
            </Button>
          </Button.Group>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

QuizScreen.propTypes = {
  answerQuestion: PropTypes.func.isRequired,
  questions: PropTypes.arrayOf(PropTypes.object).isRequired,
  activeQuestion: PropTypes.number.isRequired
};

export default QuizScreen;
