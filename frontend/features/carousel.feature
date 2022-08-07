Feature: Carousel System
    As a parent with young kids registering for my children
    I want to be edit across my children information easily
    So that I can refer conveniently

    Background: Added one child and navigating to next page
        Given I am signing up for my family
        And I have filled in my details
        And I have added a child
        When I click on the next button

    Scenario: Correct number of children
        Then I should be able to see my child's and my name in the carousel

    Scenario: Navigation from parent to child
        When I fill in my passport details
        And I click on my child icon
        And I click on my icon
        Then I should be able to view my own passport details

    Scenario: Selection of child
        When I click on my child icon
        Then my child icon should be selected

    Scenario: Selection of parent
        When I click on my icon
        Then my icon should be selected