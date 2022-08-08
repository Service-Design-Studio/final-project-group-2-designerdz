Feature: Autofill
    As a user that has uploaded the required documents
    I want to have my information auto-filled
    So that I do not need to fill it in manually

    # TODO: add in pdf
    Background: Uploaded a document
        Given I am signing up for myself
        And I have proceeded to the passport page
        And I have uploaded the document good_passport.png

    Scenario: Input fields are autofilled
        Then my information should be auto-filled

    Scenario: Input fields can be manually overwritten
        When I correct my full name
        Then my full name should be overwritten
        And I should be able to see it in the review page
