Feature: Autofill
    As a user that has uploaded the required documents
    I want to have my information auto-filled
    So that I do not need to fill it in manually

    Background: Uploaded a document
        Given I am on passport page
        And I have uploaded a document

    # Scenario: Input fields are autofilled
    #     Then my information should be auto-filled

    Scenario: Input fields can be manually overwritten
        When I edit my information 
        Then my information should be overwritten

    
