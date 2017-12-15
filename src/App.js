import React, { Component } from 'react';
import uuid from 'uuid/v1';
import { Container } from "semantic-ui-react";

import { fetchQuestions } from './services';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

class App extends Component {
  constructor() {
    super();
    this.state = this.getInitialState();
  }

  getInitialState() {
    return {
      questions: null,
      answers: [],
      ActiveScreen: HomeScreen,
      correctAnswerCount: null,
      answerResults: null
    };
  }

  async fetchQuestions() {
    this.setState({ questions: await fetchQuestions() });
  }

  start = async () => {
    await this.fetchQuestions();

    this.setState({
      activeQuestion: 0,
      ActiveScreen: QuizScreen
    });
  }

  finish() {
    const { questions, answers } = this.state;

    const correctAnswers = questions
      .map(({ correct_answer }, index) => answers[index] === correct_answer ? index : null)
      .filter(x => x !== null);

    const answerResults = questions.map((question, index) => {
      const isCorrect = correctAnswers.includes(index);

      return {
        questionNumber: index + 1,
        question: question.question,
        isCorrect,
        yourAnswer: answers[index],
        correctAnswer: question.correct_answer,
        key: uuid()
      };
    });

    this.setState({
      correctAnswerCount: correctAnswers.length,
      answerResults,
      activeQuestion: 0,
      ActiveScreen: ResultsScreen
    });
  }

  restart = () => this.setState(this.getInitialState());

  answerQuestion = answer => this.setState({
    answers: [...this.state.answers, answer],
    activeQuestion: this.state.activeQuestion + 1
  }, () => this.state.activeQuestion >= this.state.questions.length && this.finish());

  render() {
    const { ActiveScreen } = this.state;

    return (
      <Container>
        <ActiveScreen
          start={this.start}
          answerQuestion={this.answerQuestion}
          restart={this.restart}
          {...this.state} />
      </Container>
    );
  }
}

export default App;
