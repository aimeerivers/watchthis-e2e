Feature: Sign up

  Scenario: Sign up starting from the user service
    Given a user visits the user service
    And they click the "Sign up" button
    When they enter valid sign up details
    Then they should stay on the user service
    And they should see a welcome message
    When they visit the home service
    Then they should be logged in

  Scenario: Sign up starting from the home service
    Given a user visits the home service
    And they click the "Sign up" button
    When they enter valid sign up details
    Then they should be returned to the home service
    And they should be logged in
    When they visit the user service
    Then they should see a welcome message
