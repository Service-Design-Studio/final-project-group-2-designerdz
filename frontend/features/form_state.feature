# Feature: Check API Response
#     Scenario: Check API Response 
#         Given I make a GET request to "http://localhost:3000/api/v1/users"
#         When I receive a response within 0.5 seconds
#         Then response should have a status 200

#     # FIXME: 
#     Scenario: Navigating back and seeing forms saved
#         Given that I have filled up <previous> page and have navigated to <page>
#         When I navigate back to the <previous> page
#         Then the fields I have filled up in <previous> should remain

#         Examples:
#         | previous   | page       |
#         | "details"  | "passport" |
#         | "passport" | "review"   |
