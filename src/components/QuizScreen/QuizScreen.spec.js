import React from "react";
import sinon from "sinon";
import { shallow, mount } from "enzyme";

import QuizScreen from "./QuizScreen";

describe("QuizScreen", () => {
  it("successfully renders", () => {
    const instance = shallow(
      <QuizScreen
        answerQuestion={() => {}}
        questions={[]}
        activeQuestion={0}
        restart={() => {}}
      />
    );
    expect(instance).toExist;
  });
  it("should not render anything if there is no available active question", () => {
    const instance = shallow(
      <QuizScreen
        answerQuestion={() => {}}
        questions={[]}
        activeQuestion={0}
        restart={() => {}}
      />
    );
    expect(instance.children().length).toEqual(0);
  });
  it("should answer 'True' when 'True' is clicked, and 'False' when 'False' is clicked", () => {
    const answerQuestion = sinon.spy();
    const questions = [{ foo: "bar" }];
    const activeQuestion = 0;
    const instance = mount(
      <QuizScreen
        answerQuestion={answerQuestion}
        questions={questions}
        activeQuestion={activeQuestion}
        restart={() => {}}
      />
    );

    instance
      .find("button")
      .at(1)
      .simulate("click");

    expect(answerQuestion.calledWith("True"));

    instance
      .find("button")
      .at(2)
      .simulate("click");

    expect(answerQuestion.calledWith("False"));
  });
  it("should quit the quiz if the 'Quit' button is clicked", () => {
    const questions = [{ foo: "bar" }];
    const activeQuestion = 0;
    const restart = sinon.spy();
    const instance = mount(
      <QuizScreen
        answerQuestion={() => {}}
        questions={questions}
        activeQuestion={activeQuestion}
        restart={restart}
      />
    );

    instance
      .find("button")
      .at(0)
      .simulate("click");

    expect(restart.calledOnce).toEqual(true);
  });
});
