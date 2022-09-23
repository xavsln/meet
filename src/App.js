import React, { Component } from "react";
import "./App.css";
import EventList from "./EventList";
import CitySearch from "./CitySearch";
import NumberOfEvents from "./NumberOfEvents";
import { mockData } from "./mock-data";
import { extractLocations, getEvents } from "./api";
import { render } from "enzyme";

import "./nprogress.css";

class App extends Component {
  // let locations = extractLocations(mockData);

  // Create states (with React Class component, cf comments related to functional components and useState)
  state = {
    events: [],
    locations: [],
  };

  updateEvents = (location) => {
    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      this.setState({
        events: locationEvents,
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
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <div className='App'>
        {/* App.js passes a state (ie. a variable) locations as a props to CitySearch component */}
        {/* App.js passes a method updateEvents as a props to CitySearch component so it can be used in CitySearch */}
        <CitySearch
          locations={this.state.locations}
          updateEvents={this.updateEvents}
        />

        <NumberOfEvents />

        {/* App.js passes a state (ie. a variable) events as a props to EventList component */}
        <EventList events={this.state.events} />
      </div>
    );
  }
}

export default App;
