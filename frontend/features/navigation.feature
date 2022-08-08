Feature: User Navigation
    As a user signing up with DBS
    I want to be able to fill up the form smoothly
    So that I am able to have a positive experience signing up

    Background: Signing up for single user
        Given I am signing up for myself

    Scenario:  
        Given I have proceeded to the <page> page
        And I have filled up the <page> page
        When I click on the next button
        Then I should be on the <next> page
        
    Examples:
        | page       | next       |
        | details   | passport |
        | passport | review   |
        | review  | success  |

    Scenario:
        Given I have proceeded to the <page> page
        When I click on the back button
        Then I should be on the <previous> page

    Examples:
        | page   | previous  |
        | passport | details |
        | review | passport|
    
