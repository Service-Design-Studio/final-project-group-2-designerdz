Feature: Checkbox Autofill 
    As a parent with young kids registering for my children
    I want to be able to share common information between myself and my children
    So that I do not have to repeatedly fill up information

    Background: Filling up of parent details
        Given I am signing up for my family
        And I have proceeded to the child page

    Scenario: Check autofill
        When I check the autofill checkbox
        Then I should see my child details autofilled
        When I go from the family page to the review page
        And I click on my child icon
        Then I should be able to see that my child details are the same as mine

    Scenario: Uncheck autofill
        When I uncheck the autofill checkbox
        And I edit my child contact details
        And I go from the family page to the review page
        And I click on my child icon
        Then I should be able to see that my child details are different