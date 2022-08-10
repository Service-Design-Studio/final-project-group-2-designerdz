# Feature: Saving of progress
#     As a foreigner in the midst of registration
#     I want to have my progress saved
#     So that I can leave and come back to the form again without having to start over

#     Background: 
#         Given I am signing up for myself

#     Scenario: Redirection to landing page upon new device
#         Given I have proceeded to the <page> page
#         When I come back to the <page> of the form with a different browser
#         Then I should be on the landing page

#     Examples:
#         | page |
#         | passport |
#         | review |

#     Scenario: Manual-redirect to latest step
#         Given I have proceeded to the <page> page
#         When I come back to the <page> of the form with a different browser
#         And I fill up my phone number
#         Then I should be on the <page> page

#     Examples:
#         | page |
#         | passport |
#         | review |