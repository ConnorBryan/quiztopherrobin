import React from "react";
import PropTypes from "prop-types";
import { Button, Card } from "semantic-ui-react";

function HomeScreen(props) {
  const { start } = props;

  return (
    <Card.Group fluid>
      <Card fluid>
        <Card.Content>
          <Card.Header>Welcome to Quizza!</Card.Header>
        </Card.Content>
        <Card.Content extra>
          <Card.Description>
            <p>
              You will be presented with ten true/false questions. <br />
              Can you pass the trivia challenge with 100%?
            </p>
            <Button onClick={start} floated='right'>Start</Button>
          </Card.Description>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

HomeScreen.propTypes = {
  start: PropTypes.func.isRequired
};

export default HomeScreen;
