Feature: Push the button

  Scenario: Push the button
    When a user is on the button page
    Then they should see a button saying "Push me!"

  Scenario: Make a button
    Given a user is on the button page
    When they make their own button saying "Cucumber loves you"
    Then they should see a button saying "Cucumber loves you"

  Scenario: Make a random button
    Given a user is on the button page
    When they make their own button saying some random text
    Then they should see a button updated to the right text
