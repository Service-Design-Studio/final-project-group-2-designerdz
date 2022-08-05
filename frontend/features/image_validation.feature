Feature: Image Validation
    As a user uploading images
    I want to know that I have uploaded the correct image
    So that I am able to fill up the form properly

    Background: Getting onto passport page
        Given I am on the passport page

    Scenario: Upload Invalid File Format 
        When I upload an image with the wrong file format
        Then I should see an error

    Scenario: Upload Not Passport
        When I upload a not passport image
        Then I should see an error

    Scenario: Upload Blur Passport
        When I upload a blur passport image
        Then I should see an error
