Feature: Autofill
    As a user that has uploaded the required documents
    I want to have my information auto-filled
    So that I do not need to fill it in manually

    Scenario: Input fields are autofilled
        Given I am on passport page
        And I have uploaded a document
        Then my information should be auto-filled

    Scenario: Input fields can be manually overwritten
        Given I am on passport page 
        And I have uploaded a document 
        When I edit my information 
        Then my information should be overwritten

    
