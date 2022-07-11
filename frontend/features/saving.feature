Feature: Saving of progress
    Scenario:  
        Given I am on <page>
        When I click on the next button
        Then I will make a request to <url>
        When I receive a response within 0.5 seconds
        Then response should have a status 200
    
    Examples:
        | page    |  url                                                             |
        | "details"  | "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/users"       |
        | "passport" | "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/profile/98765432"   |

    Scenario:
        Given I am on <page>
        When I restart the app
        Then I should be redirected back to <page> where I left off
    
    Examples:
        | page       |
        | "details"  |
        | "passport" |
        | "review"   |


    # FIXME:
    # Scenario:
    #     Given I am on the restore page
    #     When I submit my <number> and OTP
    #     Then I should be redirected back to <page> where I left off

    # Examples:
    #     | number      | page        |
    #     | "98512101"  | "signup"    |
    #     | "87678121"  | "signup"    |
    #     | "87545311"  | "signup"    |
    #     | "98857412"  | "signup"    |

