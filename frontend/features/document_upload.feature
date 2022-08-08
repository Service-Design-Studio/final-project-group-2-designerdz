Feature: Document Upload
    As a user going through the registration process
    I want to be able to easily upload the required documents
    So that I can complete the registration process

    Background: Getting to passport page
        Given I am signing up for myself
        And I have proceeded to the passport page

    Scenario: Passport upload, preview and loading
        When I have uploaded the document <passport>
        Then I should see a loading indicator
        And I should see a preview of the document

    Examples: 
        | passport |   
        | good_passport.png |
        | good_passport.pdf |

    Scenario: Remove Document
        Given I have uploaded the document good_passport.png
        When I click on the delete button
        Then I should no longer see the image preview
