# Feature: Document Upload
#     As a user going through the registration process
#     I want to be able to easily upload the required documents
#     So that I can complete the registration process

#     Background: Uploading of passport
#         Given I am signing up for myself
#         And I have filled in my details
#         When I have uploaded the document good_passport.png

#     Scenario: Document Preview and Loading
#         Then I should see a loading indicator
#         And I should see a preview of the document

#     Scenario: Remove Document
#         When I click on the delete button
#         Then I should no longer see the image preview
