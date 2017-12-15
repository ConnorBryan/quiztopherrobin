import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Icon, Label } from "semantic-ui-react";

import config from "../../config";
import "./ResultsScreen.css";

const Aux = props => props.children;

export function getPunctuation(correctAnswerCount) {
  const count = +correctAnswerCount;

  if (count >= 8) return "!";
  else if (count >= 4 && count < 8) return ".";
  else return "...";
}

export function getColor(correct) {
  return correct ? "green" : "red";
}

export function getIcon(correct) {
  return correct ? "checkmark" : "remove";
}

function ResultsScreen(props) {
  const { restart, correctAnswerCount, answerResults } = props;
  const punctuation = getPunctuation(correctAnswerCount);

  return (
    <Card.Group itemsPerRow={1}>
      <Card fluid>
        <Card.Content textAlign="center">
          <Card.Header as="h2" className="fancy">
            You got {correctAnswerCount}/{config.QUESTION_COUNT} correct{punctuation}
          </Card.Header>
        </Card.Content>
      </Card>
      {answerResults.map(answer => (
        <Card
          raised
          key={answer.questionNumber}
          color={getColor(answer.isCorrect)}
        >
          <Card.Content>
            <Label
              as="div"
              color={getColor(answer.isCorrect)}
              icon={getIcon(answer.isCorrect)}
              corner="right"
            />
            <Card.Header as="h3" className="ResultsScreen-answerCard">
              {answer.questionNumber}. {answer.question}
            </Card.Header>
          </Card.Content>
          <Card.Content extra>
            <Card.Description className="question">
              You got this question {answer.isCorrect ? "right" : "wrong"}.
            </Card.Description>
          </Card.Content>
          <Card.Content extra>
            <Card.Description>
              <strong>Your answer:</strong> {answer.yourAnswer}
            </Card.Description>
            <Card.Description>
              <strong>Correct answer:</strong> {answer.correctAnswer}
            </Card.Description>
          </Card.Content>
        </Card>
      ))}
      <Card fluid>
        <Card.Content extra>
          <Button className="fancy" floated="right" positive onClick={restart}>
            <Icon name="refresh" /> Restart
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

ResultsScreen.propTypes = {
  restart: PropTypes.func.isRequired,
  correctAnswerCount: PropTypes.number.isRequired,
  answerResults: PropTypes.arrayOf(PropTypes.object).isRequired
};

export default ResultsScreen;
