import React, { Component } from "react";

class NumberOfEvents extends Component {
  state = {
    query: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;

    this.setState({ query: value });
  };

  render() {
    return (
      <div className='numberOfEvents'>
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
