import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/specifyNumberOfEvents.feature");

defineFeature(feature, (test) => {
  // Scenario 1: "When user hasn’t specified a number, 32 is the default number."

  test("When user hasn’t specified a number, 32 is the default number.", ({
    given,
    when,
    then,
  }) => {
    given("user hasn’t specified a number of events to display", () => {});

    let AppWrapper;
    when("the main page is opened", () => {
      AppWrapper = mount(<App />);
    });

    then("user shall see the list of the 32 upcoming events displayed", () => {
      AppWrapper.update();
      // expect(AppWrapper.find(".event")).toHaveLength(32);
      // Check with the number of entries in mockData as only 2 entries are there
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });
  });

  // Scenario 2: "User can change the number of events they want to see."

  test("User can change the number of events they want to see.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the main page is opened", () => {
      AppWrapper = mount(<App />);
    });

    and("the list of the 32 upcoming events is displayed", () => {
      AppWrapper.update();
      // expect(AppWrapper.find(".event")).toHaveLength(32);
      // Check with the number of entries in mockData as only 2 entries are there
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });

    let NumberOfEventsWrapper;
    when("user is typing 1 in the number of event textbox", () => {
      NumberOfEventsWrapper = AppWrapper.find("NumberOfEvents");
      NumberOfEventsWrapper.find(".numberOfEventsInput").simulate("change", {
        target: { value: 1 },
      });
    });

    then("user should receive a list of 1 upcoming event in that city", () => {
      expect(AppWrapper.find(".EventList")).toHaveLength(1);
    });
  });
});
