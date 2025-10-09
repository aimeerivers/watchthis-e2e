@wip
Feature: Sharing Service

  Scenario: Share a media item with another user
    Given a user is authenticated
    And there is a media item available
    When they share the media item with another user with a message
    Then the share should be created successfully
    And it should have pending status
    And the recipient should be notified

  Scenario: View received shares
    Given a user has received several shares
    When they view their received shares
    Then they should see all shares sent to them
    And the shares should be ordered by creation date
    And pagination information should be included

  Scenario: Mark a shared item as watched
    Given a user has received a share
    When they mark the share as watched
    Then the share status should be updated to watched
    And the watched timestamp should be recorded

  Scenario: Get sharing statistics
    Given a user has sent and received multiple shares
    When they request their sharing statistics
    Then they should see counts for sent shares by status
    And they should see counts for received shares by status
    And the total counts should be accurate

  Scenario: Archive a share
    Given a user has a share (sent or received)
    When they archive the share
    Then the share status should be updated to archived
    And it should no longer appear in active shares

  Scenario: Prevent sharing with yourself
    Given a user is authenticated
    When they try to share a media item with themselves
    Then they should receive a self-sharing error
    And no share should be created

  Scenario: View sent shares with status filter
    Given a user has sent shares with different statuses
    When they view their sent shares filtered by "watched" status
    Then they should only see shares marked as watched
    And the results should be paginated