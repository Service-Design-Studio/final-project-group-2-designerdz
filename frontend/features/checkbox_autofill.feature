Feature: Checkbox Autofill 
    Background: Filling up of parent details
        Given that I have saved my details
        And I add a new child

    Scenario: Check autofill
        When I check the autofill checkbox
        Then I should see my child details autofilled
    
    # Scenario: Uncheck autofill
    #     When I uncheck the autofill checkbox
    #     Then I should see my child details as empty