Feature: Check API Response
    Scenario: Check API Response 
        Given I make a GET request to "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/users"
        When I receive a response within 0.5 seconds
        Then response should have a status 200

    Scenario: Refreshing of page
        Given I am on <page> and have filled in some fields
        When I click refresh
        Then the fields I have filled up should remain

    Examples:
    | page       |
    | "signup"   |
    | "passport" |
    | "review"   |


    Scenario: Navigating back and forth and saving of forms
        Given that I have filled up <prev_page> and have navigated to <next_page>
        When I click on the back button
        Then the fields I have filled up in <prev_page> should remain
