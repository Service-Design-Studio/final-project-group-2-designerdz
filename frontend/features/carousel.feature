Feature: Carousel System
    Background: Added one child and navigating to next page
        Given I have filled in my details
        And I have added a child
        When I navigate to the passport page

    Scenario: Correct number of children
        Then I should be able to see my child's and my name in the carousel
    
#     # Scenario: Filling in of parent details
#     #     Then I should be able to fill in my passport details

#     # Scenario: Navigation to child
#     #     When I click on my child name
#     #     Then I should be able to fill in my child details

#     # Scenario: Navigating back to parent
#     #     When I fill in my passport details
#     #     And I click on my name
#     #     Then I should be able to view my own passport details

