Feature: Saving of progress
    Scenario:  
        Given that I am on the <page>
        When I click on the next button
        Then my details on <page> should be saved to the database
    
    Examples:
        | page       |
        | "signup"   |
        | "details"  |
        | "passport" |

    Scenario:  
        Given that I am on the <current> page
        When I click on the back button
        Then my previously filled details should be shown
        
    Examples:
        | page       |
        | "details"  |
        | "passport" |
        | "review"   |

    Scenario:
        Given that I am on <page>
        And that I exit the application
        When I come back to the app
        Then I should be redirected back to <page>

    Examples:
        | page       |
        | "signup"   |
        | "details"  |
        | "passport" |
        | "review"   |

    Scenario:
        Given that I am on the restore page
        When I submit my <number> and OTP
        Then I should be redirected back to the <page> where I left off

    # TODO: Seed the database

    Examples:
        | number      | page        |
        | "98512101"  | "details"   |
        | "87678121"  |  "passport" |
        | "87545311"  |  "review"   |
        | "98857412"  |  "signup"   |

