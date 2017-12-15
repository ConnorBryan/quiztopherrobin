import React, { Component } from "react";
import { Container, Icon, Message } from "semantic-ui-react";

import config from "../../config";

const Aux = ({ children }) => children;

/**
 * @func withAlerting
 * @desc Higher order component for displaying various alerts above content.
 * @param {Component} WrappedComponent
 * @returns {Component}
 */
export default function withAlerting(WrappedComponent) {
  return class AlertingProvider extends Component {
    state = { alert: {} };

    /**
     * @method displayAlert
     * @param {string} severity
     * @param {string} header
     * @param {string} content
     * Set an alert to be shown before fading away.
     * @returns {undefined}
     */
    displayAlert = (severity, header, content) =>
      this.setState(
        {
          alert: {
            severity,
            header,
            content
          }
        },
        () => setTimeout(this.clearAlert, config.ALERT_TIMEOUT)
      );

    /**
     * @method clearAlert
     * @desc Fade out the current alert.
     * @returns {undefined}
     */
    clearAlert = () => this.setState({ alert: {} });

    render() {
      const { alert } = this.state;

      const { severity, header, content } = alert;
      const showAlert = severity && header && content;
      const negative = severity === config.ALERT_TYPES.WARNING;
      const positive = severity === config.ALERT_TYPES.NOTICE;

      return (
        <Aux>
          {showAlert && (
            <Container>
              <Message icon negative={negative} positive={positive} size="huge">
                <Icon name="warning" />
                <Message.Content>
                  <Message.Header>{header}</Message.Header>
                  <p>{content}</p>
                </Message.Content>
              </Message>
            </Container>
          )}
          <WrappedComponent displayAlert={this.displayAlert} />
        </Aux>
      );
    }
  };
}
