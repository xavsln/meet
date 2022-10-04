import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { mockData } from "./mock-data";
import { extractLocations, getEvents } from "./api";
import { render } from "enzyme";
import { OffLineAlert } from "./Alert";

import "./nprogress.css";

class App extends Component {
  // let locations = extractLocations(mockData);

  // Create states (with React Class component, cf comments related to functional components and useState)
  state = {
    events: [],
    locations: [],
    locationSelected: "all",
    numberOfEvents: 32,
  };

  updateEvents = (location, eventCount) => {
    console.log("eventCount: ", eventCount);
    if (eventCount === undefined) {
      eventCount = this.state.numberOfEvents;
    } else this.setState({ numberOfEvents: eventCount });
    if (location === undefined) {
      location = this.state.locationSelected;
    }

    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);

      this.setState({
        events: locationEvents.slice(0, eventCount),
        numberOfEvents: eventCount,
      });
    });
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });

    if (!navigator.onLine) {
      this.setState({
        offLineMessage:
          "You are offline. List of events may not be up to date.",
      });
    } else {
      this.setState({
        offLineMessage: "",
      });
    }
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className='App'>
        {/* App.js passes a state (ie. a variable) locations as a props to CitySearch component */}
        {/* App.js passes a method updateEvents as a props to CitySearch component so it can be used in CitySearch */}
        <div className='offLineAlert'>
          <OffLineAlert text={this.state.offLineMessage} />
        </div>
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />

        <NumberOfEvents
          numberOfEvents={this.state.numberOfEvents}
          updateEvents={this.updateEvents}
        />

        {/* App.js passes a state (ie. a variable) events as a props to EventList component */}
        <EventList events={this.state.events} />
        {console.log(this.state)}
      </div>
    );
  }
}

export default App;
