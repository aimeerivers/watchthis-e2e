Feature: Log in

  Scenario: Log in starting from the user service
    Given a user visits the user service
    And they click the "Log in" button
    When they enter valid log in details
    Then they should stay on the user service
    And they should see a welcome message
    When they visit the home service
    Then they should be logged in

  Scenario: Log in starting from the home service
    Given a user visits the home service
    And they click the "Log in" button
    When they enter valid log in details
    Then they should be returned to the home service
    And they should be logged in
    When they visit the user service
    Then they should see a welcome message
