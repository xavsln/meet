import React from "react";
import { mount, shallow } from "enzyme";
import App from "../App";
import EventList from "../EventList";
import CitySearch from "../CitySearch";
import NumberOfEvents from "../NumberOfEvents";

import { mockData } from "../mock-data";

import { extractLocations, getEvents } from "../api";

// ===========================
// Scope related to UNIT TESTS
// ===========================

describe("<App /> component", () => {
  let AppWrapper;

  beforeAll(() => {
    AppWrapper = shallow(<App />);
  });

  test("render list of events", () => {
    expect(AppWrapper.find(EventList)).toHaveLength(1);
  });

  test("render number of events to show components", () => {
    expect(AppWrapper.find(NumberOfEvents)).toHaveLength(1);
  });

  test("render CitySearch", () => {
    expect(AppWrapper.find(CitySearch)).toHaveLength(1);
  });
});

// ==================================
// Scope related to INTEGRATION TESTS
// ==================================

describe("<App /> integration", () => {
  test('App passes "events" state as a prop to EventList', () => {
    // Render the full App using mount and set it in AppWrapper constant
    const AppWrapper = mount(<App />);
    const AppEventsState = AppWrapper.state("events");

    // Check the events state is not undefined
    expect(AppEventsState).not.toEqual(undefined);

    // Check the events state is passed properly as props to Eventlist
    expect(AppWrapper.find(EventList).props().events).toEqual(AppEventsState);

    // Tests that use the same DOM will affect each other, so it is needed to “clean up” the DOM after each test using a unmount() function
    AppWrapper.unmount();
  });

  test('App passes "locations" state as a prop to CitySearch', () => {
    const AppWrapper = mount(<App />);
    const AppLocationsState = AppWrapper.state("locations");
    expect(AppLocationsState).not.toEqual(undefined);
    expect(AppWrapper.find(CitySearch).props().locations).toEqual(
      AppLocationsState
    );
    AppWrapper.unmount();
  });

  test("get list of events matching the city selected by the user", async () => {
    const AppWrapper = mount(<App />);
    const CitySearchWrapper = AppWrapper.find(CitySearch);
    const locations = extractLocations(mockData);
    CitySearchWrapper.setState({ suggestions: locations });
    const suggestions = CitySearchWrapper.state("suggestions");
    const selectedIndex = Math.floor(Math.random() * suggestions.length);
    const selectedCity = suggestions[selectedIndex];
    await CitySearchWrapper.instance().handleItemClicked(selectedCity);
    const allEvents = await getEvents();
    const eventsToShow = allEvents.filter(
      (event) => event.location === selectedCity
    );
    expect(AppWrapper.state("events")).toEqual(eventsToShow);
    AppWrapper.unmount();
  });

  test('get list of all events when user selects "See all cities"', async () => {
    const AppWrapper = mount(<App />);
    const suggestionItems = AppWrapper.find(CitySearch).find(".suggestions li");
    await suggestionItems.at(suggestionItems.length - 1).simulate("click");
    const allEvents = await getEvents();
    expect(AppWrapper.state("events")).toEqual(allEvents);
    AppWrapper.unmount();
  });

  test('App passes "numberOfEvents" state as a prop to NumberOfEvents', () => {
    // Render the full App using mount and set it in AppWrapper constant
    const AppWrapper = mount(<App />);
    const AppNumberOfEventsState = AppWrapper.state("numberOfEvents");

    // Check the **numberOfEvents** state is not undefined
    expect(AppNumberOfEventsState).not.toEqual(undefined);

    // Check the **numberOfEvents** state is passed properly as props to NumberOfEvents
    expect(AppWrapper.find(NumberOfEvents).props().numberOfEvents).toEqual(
      AppNumberOfEventsState
    );

    // Tests that use the same DOM will affect each other, so it is needed to “clean up” the DOM after each test using a unmount() function
    AppWrapper.unmount();
  });

  // Set up a test that will check that App.js get a list of events with a numberOfevents equal the the defined numberOfEvents (ie. 32)
  test("get list of all events that will be the defined numberOfEvents, ie. 32", async () => {
    const AppWrapper = mount(<App />);
    const NumberOfEventsWrapper = AppWrapper.find(NumberOfEvents);

    expect(AppWrapper.state("numberOfEvents")).toEqual(32);
    AppWrapper.unmount();
  });
});
