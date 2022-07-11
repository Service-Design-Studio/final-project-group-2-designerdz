Feature: Checkbox Autofill 
    Background: Filling up of parent details
        Given that I have saved my details
        And I navigate to child details page

    Scenario: Check autofill
        When I check the autofill checkbox
        Then I should see my child details autofilled
    
    Scenario: Uncheck autofill
        When I uncheck the autofill checkbox
        Then I should see my child details as empty

# "Sarah Abbot", "96183292", "sarah_abbot@gmail.com"