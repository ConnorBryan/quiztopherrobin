import React, { Component } from 'react';

import { fetchQuestions } from './services';

class App extends Component {
  componentDidMount() {
    this.fetchQuestions();
  }

  async fetchQuestions() {
    const questions = await fetchQuestions();
    
    console.log(questions);
  }

  render() {
    return (
      <p>Test</p>
    );
  }
}

export default App;
