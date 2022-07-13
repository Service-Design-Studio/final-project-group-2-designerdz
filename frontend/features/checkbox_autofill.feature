Feature: Checkbox Autofill 
As a parent with young kids registering for my children
I want to be able to share common information between myself and my children
So that I do not have to repeatedly fill up information

    Background: Filling up of parent details
        Given that I have saved my details
        And I add a new child

    Scenario: Check autofill
        When I check the autofill checkbox
        Then I should see my child details autofilled
    
    Scenario: Uncheck autofill
        When I uncheck the autofill checkbox
        Then I should see my child details as empty