import React from "react";
import PropTypes from "prop-types";
import { Button, Card, Icon, Image } from "semantic-ui-react";

import config from "../../config";
import splash from "./splash.jpg";
import "./HomeScreen.css";

function HomeScreen(props) {
  const { start } = props;

  return (
    <Card.Group fluid>
      <Card fluid>
        <Card.Content>
          <Card.Header className="fancy text-center">
            Welcome to {config.APP_TITLE}
          </Card.Header>
        </Card.Content>

        <Image src={splash} />

        <Card.Content extra>
          <Card.Description
            className="HomeScreen-description"
            textAlign="center"
          >
            You will be presented with ten true/false questions. <br />
            Can you answer them all correctly and score 100%?
          </Card.Description>
        </Card.Content>

        <Card.Content extra>
          <Button className="fancy" floated="right" positive onClick={start}>
            <Icon name="send" /> Start
          </Button>
        </Card.Content>
      </Card>
    </Card.Group>
  );
}

HomeScreen.propTypes = {
  start: PropTypes.func.isRequired
};

export default HomeScreen;

