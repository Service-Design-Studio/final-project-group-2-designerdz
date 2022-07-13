Feature: Review page
    As a parent who has completed the sign up process
    I want to be able to review and correct any misfilled information
    So that I do not have to navigate the process of filling up again

    Background:
        Given that I have filled all my and my child's details
        And that I am on the review page

    Scenario: Reviewing all of my family details
        When I click on my icon
        Then I should be able to see that my information is Correct
        When I click on my child icon
        Then I should be able to see that my child information is correct

    Scenario: Editing my child misfilled information
        When I click on my child icon
        And I see that my child information is misfilled
        And I correct my child information
        Then I should be able to see that my child information is correct