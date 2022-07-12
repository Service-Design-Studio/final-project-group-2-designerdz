Feature: Children management
    Background: Added one child
        Given I have successfully added a child
        When that I am on the family page
        Then I should see my child on the family page                 

    Scenario: Edit child details
        When I edit my child name
        Then I should see my edited child name on the family page

    Scenario: Remove children
        When I click on remove button for my child
        Then my child should be removed               