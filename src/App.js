import React, { Component } from 'react';

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
        isCorrect,
        yourAnswer: answers[index],
        correctAnswer: question.correct_answer
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
  }, () => {
    const { questions, activeQuestion } = this.state;

    if (activeQuestion >= questions.length) this.finish();
  });

  render() {
    const { ActiveScreen } = this.state;

    return (
      <ActiveScreen
        start={this.start}
        answerQuestion={this.answerQuestion}
        restart={this.restart}
        {...this.state} />
    );
  }
}

export default App;
