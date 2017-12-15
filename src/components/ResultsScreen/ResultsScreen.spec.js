import React from "react";
import sinon from "sinon";
import { shallow, mount } from "enzyme";

import {
  getPunctuation,
  getColor,
  getIcon,
  default as ResultsScreen
} from "./ResultsScreen";

describe("QuizScreen utility functions", () => {
  describe("getPunctuation", () => {
    it("should return the correct punctuation for a given score", () => {
      expect(getPunctuation(8)).toEqual("!");
      expect(getPunctuation(5)).toEqual(".");
      expect(getPunctuation(1)).toEqual("...");
    });
  });
  describe("getColor", () => {
    it("should return the correct color for a given answer", () => {
      expect(getColor(true)).toEqual("green");
      expect(getColor(false)).toEqual("red");
    });
  });
  describe("getIcon", () => {
    it("should return the correct icon for a given answer", () => {
      expect(getIcon(true)).toEqual("checkmark");
      expect(getIcon(false)).toEqual("remove");
    });
  });
});

describe("QuizScreen", () => {
  it("successfully renders", () => {
    const instance = shallow(
      <ResultsScreen
        answerResults={[]}
        correctAnswerCount={10}
        restart={() => {}}
      />
    );
    expect(instance).toExist;
  });
  it("displays a results card for each question", () => {
    const answerResults = [
      {
        questionNumber: 1
      },
      {
        questionNumber: 2
      },
      {
        questionNumber: 3
      }
    ];
    const correctAnswerCount = 2;
    const instance = mount(
      <ResultsScreen
        answerResults={answerResults}
        correctAnswerCount={correctAnswerCount}
        restart={() => {}}
      />
    );
    expect(instance.find(".card").length).toEqual(5);
  });
  it("returns to the original screen when the 'Restart' button is clicked", () => {
    const restart = sinon.spy();
    const instance = mount(
      <ResultsScreen
        answerResults={[]}
        correctAnswerCount={10}
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
