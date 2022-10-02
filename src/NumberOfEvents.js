import React, { Component } from "react";
import { ErrorAlert } from "./Alert";

class NumberOfEvents extends Component {
  state = {
    query: 32,
  };

  // handleInputChanged = (event) => {
  //   const value = event.target.value;

  //   this.setState({ query: value });
  //   this.props.updateEvents(undefined, value);
  // };

  handleInputChanged = (event) => {
    const value = event.target.value;

    if (value > 0 && value <= 32) {
      this.setState({
        query: value,
        infoText: "",
      });
      this.props.updateEvents(undefined, value);
    } else {
      this.setState({
        query: value,
        infoText:
          "The number of events entered shall be a number between 1 and 32. Please try again.",
      });
    }
  };

  render() {
    return (
      <div className='numberOfEvents'>
        <ErrorAlert text={this.state.infoText} />
        <input
          type='text'
          className='numberOfEventsInput'
          value={this.state.query}
          onChange={this.handleInputChanged}
        ></input>
      </div>
    );
  }
}

export default NumberOfEvents;
