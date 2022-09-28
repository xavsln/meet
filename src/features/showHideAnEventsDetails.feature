Feature: Show/hide event details

Scenario: An event element is collapsed by default.
Given the user opens the app
When the list of upcoming events is showing
Then the user should not see the full details of each event

Scenario: User can expand an event to see its details.
Given the user opens the app
And the list of upcoming events is showing
When the user clicks on the Show Details button of the first event in the list
Then the user can see the details of this event

Scenario: User can collapse an event to hide its details.
Given the user opens the app
And the list of upcoming events is showing
And the user clicked on the first event to show the details of this event
And the show details button is now available
When the user clicks on the Hide Details button of the same event
Then the details of the event should be hidden
