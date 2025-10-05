Feature: Log out

  Background:
    Given a user is logged in

  Scenario: Log out starting from the user service
    Given a user visits the user service
    When they click the "Log out" button
    Then they should stay on the user service
    And they should not be logged in
    When they visit the home service
    Then they should not be logged in

  Scenario: Log out starting from the home service
    Given a user visits the home service
    When they click the "Log out" button
    Then they should be returned to the home service
    And they should not be logged in
    When they visit the user service
    Then they should not be logged in
