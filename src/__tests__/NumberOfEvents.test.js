import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  // NumberOfEvents component shall have an input area for user to enter nber of events to be shown
  let NumberOfEventsWrapper;

  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test("render text input", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEventsInput")).toHaveLength(1);
  });

  // Text entered into the input area shall render correctly
  test("renders text input correctly", () => {
    const query = NumberOfEventsWrapper.state("query");
    expect(
      NumberOfEventsWrapper.find(".numberOfEventsInput").prop("value")
    ).toBe(query);
  });

  // GIVEN the user is on the main page, WHEN user selects a city THEN the loaded list of events shall not exceed the default value
  test("Load a list of events by default", () => {
    // Check the default number of events to be shown to the user is 32

    // expect(NumberOfEventsWrapper.state("query")).toBe(32);
    expect(
      NumberOfEventsWrapper.find(".numberOfEventsInput").prop("value")
    ).toBe(32);
  });

  // State is changed when text input changes
  test("change state when number of events entered changes", () => {
    NumberOfEventsWrapper.setState({ query: "8" });

    const eventObject = { target: { value: "3" } };

    NumberOfEventsWrapper.find(".numberOfEventsInput").simulate(
      "change",
      eventObject
    );
    expect(NumberOfEventsWrapper.state("query")).toBe("3");
  });
});
