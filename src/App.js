import React, { Component } from 'react';

import { fetchQuestions } from './services';
import HomeScreen from './components/HomeScreen';
import QuizScreen from './components/QuizScreen';
import ResultsScreen from './components/ResultsScreen';

class App extends Component {
  state = {
    questions: null,
    inProgress: false
  };

  start = async () => {
    await this.fetchQuestions();
    this.setState({ inProgress: true }, () => alert(JSON.stringify(this.state.questions, null, 2)));
  }

  async fetchQuestions() {
    this.setState({ questions: await fetchQuestions() });
  }

  render() {
    return (
      <button onClick={this.start}>
        Start
      </button>
    );
  }
}

export default App;
