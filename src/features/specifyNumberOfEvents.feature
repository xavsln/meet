Feature: Specify Number of Events

Scenario: When user hasn’t specified a number, 32 is the default number.
Given user hasn’t specified a number of events to display
When the main page is opened
Then user shall see the list of the 32 upcoming events displayed


Scenario: User can change the number of events they want to see.
Given the main page is opened
And the list of the 32 upcoming events is displayed
When user is typing 1 in the number of event textbox
Then user should receive a list of 1 upcoming event in that city