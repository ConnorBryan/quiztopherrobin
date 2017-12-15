import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Icon, Image } from "semantic-ui-react";

import config from "../../config";
import splash from "./splash.jpg";
import "./HomeScreen.css";

/**
 * @func HomeScreen
 * @desc The initial view for the application.
 *  Provides basic information and can start a new quiz.
 * @param {object} props
 * @returns {Component}
 */
function HomeScreen(props) {
  const { start, inProgress } = props;

  return (
    <Card.Group>
      <Card fluid>
        <Card.Content>
          <Card.Header className="fancy" textAlign="center">
            Welcome to {config.APP_TITLE}
          </Card.Header>
        </Card.Content>
        <Image src={splash} />
        <Card.Content extra>
          <Card.Description
            className="HomeScreen-description"
            textAlign="center"
          >
            You will be presented with {config.QUESTION_COUNT} true/false
            questions. <br />
            Can you answer them all correctly and score 100%?
          </Card.Description>
        </Card.Content>
        <Card.Content extra>
          <Button
            className="fancy"
            disabled={inProgress}
            floated="right"
            loading={inProgress}
            onClick={start}
            positive
          >
            <Icon name="send" /> Start
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

HomeScreen.propTypes = {
  start: PropTypes.func.isRequired,
  inProgress: PropTypes.bool
};

export default HomeScreen;
