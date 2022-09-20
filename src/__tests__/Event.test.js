import React from "react";
import { shallow } from "enzyme";
import Event from "../Event";

import { mockData } from "../mock-data";

describe("<Event /> component", () => {
  let event, EventWrapper;
  beforeAll(() => {
    event = mockData[0];
    EventWrapper = shallow(<Event event={event} />);
  });

  // -----------------------------------------------------------
  // Basic Event structure tests - Relevant tags should be there
  // -----------------------------------------------------------

  // - When details are collapsed -

  test("render an event basic structure when it is collapsed", () => {
    expect(EventWrapper.find(".event")).toHaveLength(1);
  });

  test("renders an **event starting date and time** element when it is collapsed", () => {
    expect(EventWrapper.find(".startingDateTime")).toHaveLength(1);
  });

  test("renders an **event title** element when it is collapsed", () => {
    expect(EventWrapper.find(".eventTitle")).toHaveLength(1);
  });

  test("renders a **group** element when it is collapsed", () => {
    expect(EventWrapper.find(".groupName")).toHaveLength(1);
  });

  test("renders a confirmedAttendees element when it is collapsed", () => {
    expect(EventWrapper.find(".confirmedAttendees")).toHaveLength(1);
  });

  test("renders event collapsed by default", () => {
    expect(EventWrapper.state("showDetails")).toBe(false);
  });

  test("render a 'Details' button when it is collapsed", () => {
    expect(EventWrapper.find(".eventButton-showDetails")).toHaveLength(1);
  });

  // - When details are shown -

  // -- State shall be changed
  test("When 'Show Details' button is clicked, event details will be shown (event state will be changed)", () => {
    EventWrapper.find(".eventButton-showDetails").simulate("click");
    expect(EventWrapper.state("showDetails")).toBe(true);
  });

  test("When 'Details button'is clicked (state is updated to true), the relevant element will be shown after button is clicked (relevant details div)", () => {
    EventWrapper.setState({
      showDetails: false,
    });
    EventWrapper.find(".eventButton-showDetails").simulate("click");
    expect(EventWrapper.find(".eventDetails")).toHaveLength(1);
  });

  // -- The Show Details button should disappear
  test("remove 'Show Details' button when event is not collapsed", () => {
    EventWrapper.setState({
      showDetails: false,
    });
    EventWrapper.find(".eventButton-showDetails").simulate("click");
    expect(EventWrapper.find(".eventButton-showDetails")).toHaveLength(0);
  });

  // -- A Hide Details button should appear
  test("add a 'Hide Details' button when event details is shown", () => {
    EventWrapper.setState({
      showDetails: true,
    });
    expect(EventWrapper.find(".eventButton-hideDetails")).toHaveLength(1);
  });

  // ---------------------------------------------------------
  // Data for each Event tests - Relevant data should be there
  // ---------------------------------------------------------

  // - When details are collapsed -

  test("render an **event title** using data from the mock-data for events when it is collapsed", () => {
    expect(EventWrapper.find(".eventTitle").text()).toBe(event.summary);
  });

  test("render an **event starting date and time** using data from the mock-data for events when it is collapsed", () => {
    expect(EventWrapper.find(".startingDateTime").text()).toContain(
      event.start.dateTime
    );
  });

  // ACTION: Clarify from where the data related to GROUP can be extracted

  // ACTION: Clarify from where the data related to PEOPLE ATTENDING can be extracted

  // - When details are shown -

  test("render an **event description** using data from the mock-data for events when details are shown", () => {
    EventWrapper.setState({
      showDetails: true,
    });
    expect(EventWrapper.find(".eventDescription").text()).toBe(
      event.description
    );
  });

  test("render an **event location** using data from the mock-data for events when details are shown", () => {
    EventWrapper.setState({
      showDetails: true,
    });
    expect(EventWrapper.find(".eventLocation").text()).toBe(event.location);
  });

  test("render an **event htmlLink** using data from the mock-data for events when details are shown", () => {
    EventWrapper.setState({
      showDetails: true,
    });
    expect(EventWrapper.find(".eventHtmlLink").text()).toBe(event.htmlLink);
  });
});
