Feature: Sign up

  Scenario: Sign up with valid details
    Given a user visits the user service
    And they click the "Sign up" button
    When they enter valid sign up details
    Then they should see a welcome message
