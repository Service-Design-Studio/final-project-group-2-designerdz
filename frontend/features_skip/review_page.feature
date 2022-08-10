Feature: Review page
    As a parent who has completed the sign up process
    I want to be able to review and correct any misfilled information
    So that I do not have to navigate the process of filling up again

    Background:
        Given I am signing up for my family
        And I have proceeded to the review page

    Scenario: Reviewing all of my family details
        When I click on my icon
        Then I should be able to see that my information is correct
        When I click on my child icon
        Then I should be able to see that my child information is correct

    Scenario: Redirect to respective pages on click of edit button on review page
        When I click on my child icon
        And I click on the <edit> button 
        Then I should be on the <page> page

        Examples:
        | edit | page |
        | basic_edit | child  |
        | passport_edit | passport |

    Scenario: Editing my child misfilled information
        When I click on my child icon
        And I see that my child information is misfilled
        And I correct my child information
        Then I should be able to see that my child information has been corrected
