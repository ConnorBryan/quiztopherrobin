import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Icon } from "semantic-ui-react";

function QuizScreen(props) {
  const { answerQuestion, questions, activeQuestion, restart } = props;

  if (!questions[activeQuestion]) return null;

  const { category, question } = questions[activeQuestion];

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header as="h3">
            Question {activeQuestion + 1} / {questions.length}
            <Button
              className="fancy"
              floated="right"
              negative
              onClick={restart}
            >
              <Icon name="reply" /> Quit
            </Button>
          </Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Card.Header as="h5">{category}</Card.Header>
        </Card.Content>
        <Card.Content textAlign="center">
          <Card.Description className="question">{question}</Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button.Group fluid>
            <Button
              positive
              className="fancy"
              onClick={() => answerQuestion("True")}
            >
              <Icon name="checkmark" /> True
            </Button>
            <Button.Or />
            <Button
              negative
              className="fancy"
              onClick={() => answerQuestion("False")}
            >
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
  activeQuestion: PropTypes.number.isRequired,
  restart: PropTypes.func.isRequired
};

export default QuizScreen;
