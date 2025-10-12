Feature: Media Service

  Scenario: Media service requires authentication
    When an unauthenticated user tries to access the media service
    Then they should receive a 401 Unauthorized response

  Scenario: Add a new media item with a valid URL
    Given a user is authenticated
    When they add a media item with a YouTube URL
    Then the media item should be created successfully
    And it should detect YouTube as the platform
    And it should have pending extraction status

  @wip
  Scenario: Search for media items
    Given a user has added several media items
    When they search for media with a specific keyword
    Then they should see relevant media items in the results
    And the results should include pagination information

  @wip
  Scenario: Extract metadata preview from URL
    Given a user provides a valid media URL
    When they request metadata extraction preview
    Then they should receive extraction information
    And it should show the detected platform
    And no media item should be stored

  Scenario: Reject invalid URLs
    Given a user is authenticated
    When they try to add a media item with an invalid URL
    Then they should receive a validation error
    And no media item should be created

  Scenario: Allow duplicate media URLs
    Given a user is authenticated
    And a media item already exists with a specific URL
    When they try to add the same URL again
    Then they should receive a 200 OK response
    And the existing media item should be returned
