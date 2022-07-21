Feature: Saving of progress
    As a foreigner in the midst of registration
    I want to have my progress saved
    So that I can leave and come back to the form again without having to start over

    Scenario:  
        Given I am on <page>
        When I click on the next button
        Then I will make a request to <url>
        When I receive a response within 0.5 seconds
        Then response should have a status 200
    
    Examples:
        | page    |  url                                                             |
        | "details"  | "http://localhost:3000/api/v1/users"    |

    Scenario:
        Given I am on <page>
        When I restart the app
        Then I should be redirected back to <page> where I left off
    
    Examples:
        | page       |
        | "details"  |
        | "passport" |
        | "review"   |

