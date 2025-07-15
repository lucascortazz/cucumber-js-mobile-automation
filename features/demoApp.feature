Feature: Test BrowserStack Demo App

@device_test
Scenario: Open and verify the Demo App on dynamic devices
  # This test supports dynamic device selection via environment variables
  # Example: DEVICE="iPhone 13 Pro" OS_VERSION="15.0" PLATFORM="iOS" npm test
  Given I launch the BrowserStack demo app
  Then I should see the demo app home screen
  And I tap on the Web View button
  Then I should see the Web View page open
  And I close the app
  Then I should see the app closed
