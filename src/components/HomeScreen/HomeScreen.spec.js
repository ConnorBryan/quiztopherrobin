import React from "react";
import sinon from "sinon";
import { shallow, mount } from "enzyme";

import HomeScreen from "./HomeScreen";

describe("HomeScreen", () => {
  it("successfully renders", () => {
    const instance = shallow(<HomeScreen start={() => {}} />);
    expect(instance).toExist;
  });
  it("begins a new quiz session when 'Start' is pressed by the user.", () => {
    const start = sinon.spy();
    const instance = mount(<HomeScreen start={start} />);

    instance.find("button").simulate("click");

    expect(start.called).toEqual(true);
  });
});
