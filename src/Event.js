import React, { Component } from "react";

class Event extends Component {
  state = {
    showDetails: false,
  };

  toggleEventDetails = () => {
    this.setState({ showDetails: !this.state.showDetails });
  };

  render() {
    const { event } = this.props;
    return (
      <div className='event'>
        <p className='startingDateTime'>
          {new Date(event.start.dateTime).toLocaleString()}
        </p>
        <h3 className='eventTitle'>{event.summary}</h3>
        <h5 className='groupName'></h5>
        <p className='confirmedAttendees'>
          <i></i>
        </p>

        {this.state.showDetails && (
          <div className='eventDetails'>
            <p className='eventDescription'>{event.description}</p>
            <p className='eventLocation'>{event.location}</p>
            <p className='eventHtmlLink'>
              <a href={event.htmlLink} target='_blank'>
                Link to the event
              </a>
            </p>
          </div>
        )}

        {!this.state.showDetails ? (
          <button
            className='eventButton-showDetails'
            onClick={this.toggleEventDetails}
          >
            Show Details
          </button>
        ) : (
          <button
            className='eventButton-hideDetails'
            onClick={this.toggleEventDetails}
          >
            Hide Details
          </button>
        )}
      </div>
    );
  }
}
export default Event;
