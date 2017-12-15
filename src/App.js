import React, { Component } from "react";
import PropTypes from "prop-types";
import uuid from "uuid/v1";
import { Container } from "semantic-ui-react";

import config from "./config";
import { fetchQuestions } from "./services";
import withAlerting from "./components/withAlerting";
import HomeScreen from "./components/HomeScreen";
import QuizScreen from "./components/QuizScreen";
import ResultsScreen from "./components/ResultsScreen";

/**
 * @class App
 * @desc App serves as the standalone container
 *  and provides various properties and methods to subscreens,
 */
class App extends Component {
  static propTypes = {
    displayAlert: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = this.getInitialState();
  }

  componentDidCatch(e) {
    this.props.displayAlert(
      config.ALERT_TYPES.WARNING,
      "An error occurred.",
      "You may start a new quiz at any time."
    );
    this.restart();
  }

  /**
   * @method getInitialState
   * @desc Provides an object containing the defauly state for the application.
   * @returns {StateType}
   */
  getInitialState = () => ({
    ActiveScreen: HomeScreen,
    answers: [],
    answerResults: null,
    correctAnswerCount: null,
    inProgress: false,
    questions: null
  });

  /**
   * @async
   * @method start
   * @desc Enables loading, and begins the quiz process.
   * @returns {undefined}
   */
  start = async () => {
    try {
      this.setState({ inProgress: true });

      await this.fetchQuestions();

      this.setState({
        activeQuestion: 0,
        ActiveScreen: QuizScreen
      });
    } catch (e) {
      this.setState({
        inProgress: false
      });
    }
  };

  /**
   * @async
   * @method fetchQuestions
   * @desc Retrieves a collection of question objects from the configured API endpoint.
   * @returns {Promise<Array<QuestionType>>}
   */
  fetchQuestions = async () =>
    this.setState({ questions: await fetchQuestions() });

  /**
   * @method answerQuestion
   * @desc Given a string, update the collection of all answers
   *  and move on to the next question.
   * @param {string} answer
   * @returns {undefined}
   */
  answerQuestion = answer =>
    this.setState(
      {
        answers: [...this.state.answers, answer],
        activeQuestion: this.state.activeQuestion + 1
      },
      this.checkIfFinished
    );

  /**
   * @method checkIfFinished
   * @desc When there are no more questions, finish the quiz.
   * @returns {undefined}
   */
  checkIfFinished = () =>
    this.state.activeQuestion >= this.state.questions.length && this.finish();

  /**
   * @method finish
   * @desc Generate a collection of correct answers
   *  with which render the ResultsScreen.
   * @return {undefined}
   */
  finish = () => {
    const { questions, answers } = this.state;

    const answerResults = questions.map((question, index) => ({
      category: question.category,
      correctAnswer: question.correct_answer,
      key: uuid(),
      isCorrect: answers[index] === question.correct_answer,
      question: question.question,
      questionNumber: index + 1,
      yourAnswer: answers[index]
    }));

    this.setState(
      {
        ActiveScreen: ResultsScreen,
        activeQuestion: 0,
        answerResults,
        correctAnswerCount: questions.filter(
          ({ correct_answer }, index) => answers[index] === correct_answer
        ).length,
        inProgress: false
      },
      this.alertResults
    );
  };

  /**
   * @method alertResults
   * @desc Display an alert detail the ratio of correct answers to incorrect answers.
   * @returns {undefined}
   */
  alertResults = () =>
    this.props.displayAlert(
      config.ALERT_TYPES.NOTICE,
      "Your results are in",
      `You scored ${this.state.correctAnswerCount} / ${this.state.questions
        .length}.`
    );

  /**
   * @method restart
   * @desc Put everything back together again, as if none of it ever happened.
   * @returns {undefined}
   */
  restart = () => this.setState(this.getInitialState());

  render() {
    const { ActiveScreen } = this.state;

    return (
      <Container>
        <ActiveScreen
          start={this.start}
          answerQuestion={this.answerQuestion}
          restart={this.restart}
          {...this.state}
        />
      </Container>
    );
  }
}

export default withAlerting(App);
