import { loadFeature, defineFeature } from "jest-cucumber";
import { mount, shallow } from "enzyme";
import App from "../App";
import { mockData } from "../mock-data";

const feature = loadFeature("./src/features/showHideAnEventsDetails.feature");

defineFeature(feature, (test) => {
  // Scenario 1: An event element is collapsed by default.
  test("An event element is collapsed by default.", ({ given, when, then }) => {
    let AppWrapper;
    given("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    when("the list of upcoming events is showing", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });

    then("the user should not see the full details of each event", () => {
      expect(AppWrapper.find(".eventDetails")).toHaveLength(0);
    });
  });

  // Scenario 2: User can expand an event to see its details.

  test("User can expand an event to see its details.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    and("the list of upcoming events is showing", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });

    when(
      "the user clicks on the Show Details button of the first event in the list",
      () => {
        AppWrapper.find(".eventButton-showDetails").at(0).simulate("click");
      }
    );

    then("the user can see the details of this event", () => {
      expect(AppWrapper.find(".eventDetails")).toHaveLength(1);
    });
  });

  // Scenario 3: User can collapse an event to hide its details.

  test("User can collapse an event to hide its details.", ({
    given,
    and,
    when,
    then,
  }) => {
    let AppWrapper;
    given("the user opens the app", () => {
      AppWrapper = mount(<App />);
    });

    and("the list of upcoming events is showing", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".event")).toHaveLength(mockData.length);
    });

    and(
      "the user clicked on the first event to show the details of this event",
      () => {
        AppWrapper.find(".eventButton-showDetails").at(0).simulate("click");
        expect(AppWrapper.find(".eventDetails")).toHaveLength(1);
      }
    );

    and("the show details button is now available", () => {
      AppWrapper.update();
      expect(AppWrapper.find(".eventButton-hideDetails")).toHaveLength(1);
    });

    when("the user clicks on the Hide Details button of the same event", () => {
      AppWrapper.find(".eventButton-hideDetails").at(0).simulate("click");
    });

    then("the details of the event should be hidden", () => {
      expect(AppWrapper.find(".eventDetails")).toHaveLength(0);
    });
  });
});
