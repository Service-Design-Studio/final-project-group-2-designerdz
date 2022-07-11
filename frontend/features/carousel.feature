Feature: Carousel System
    Background: Added one child and navigating to next page
        Given that I have added a child
        And I navigate to the next page
        Then I should be on the passport page

    Scenario: Correct number of children
        When I click on continue to next page
        Then I should be able to see my child's and my name in the carousel

    Scenario: Navigation
        When I am viewing my details
        And I click on my child name
        Then I should see the my child details

