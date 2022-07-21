Feature: Edit on review page
As a user on the review page of the registration process
I want to be able to ensure my information entered so far is accurate
So that I can complete my registration process with the correct information entered
    
    Background: Filling up of necessary information
        Given I have filled up the neccesary information before 

    Scenario: Summary of information provided thus far on review page
        When I am on the review page
        Then I should see all <entered_information> of <field> I have entered

        Examples:
        | entered_information | shown_information | field |


    Scenario: Redirect to respective pages on click of edit button on review page
        When I am on "review" page and I want to edit my <details>
        And I click on <button> button
        Then i should be on <next_page> page

        Examples:
        |       details       | button | next_page  |
        | "Basic Information" | "edit" | "details"  |
        | "Passport Details"  | "edit" | "passport" |


    Scenario: Updating of correct information at relevant pages after clicking edit button
        And I click on "edit" button
        And I am on <page>
        And I have updated my <details> on the relevant pages
        When I click on "next" button //TODO: check what the name of the button, should be "next" I think
        Then I should be on "review" page
        And I should see my information updated <details> as well

        Examples:
        |    page    | details |
        | "details"  | 
        | "passport" |


