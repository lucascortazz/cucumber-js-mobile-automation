Feature: Calculator App Testing
  As a user
  I want to test calculator functionality
  So I can verify basic arithmetic operations

  Scenario: Basic Calculator Addition
    Given I launch the calculator app
    When I tap on number "5"
    And I tap on the "+" button
    And I tap on number "3"
    And I tap on the "=" button
    Then I should see the result "8"

  Scenario: Basic Calculator Subtraction
    Given I launch the calculator app
    When I tap on number "9"
    And I tap on the "-" button
    And I tap on number "4"
    And I tap on the "=" button
    Then I should see the result "5"

  Scenario: Basic Calculator Multiplication
    Given I launch the calculator app
    When I tap on number "7"
    And I tap on the "*" button
    And I tap on number "6"
    And I tap on the "=" button
    Then I should see the result "42"

  Scenario: Basic Calculator Division
    Given I launch the calculator app
    When I tap on number "8"
    And I tap on the "/" button
    And I tap on number "2"
    And I tap on the "=" button
    Then I should see the result "4"

  Scenario: Calculator Clear Function
    Given I launch the calculator app
    When I tap on number "5"
    And I tap on the "+" button
    And I tap on number "3"
    And I tap on the "C" button
    Then I should see the display cleared

  Scenario: Calculator Multiple Operations
    Given I launch the calculator app
    When I tap on number "2"
    And I tap on the "+" button
    And I tap on number "3"
    And I tap on the "*" button
    And I tap on number "4"
    And I tap on the "=" button
    Then I should see the result "20"
