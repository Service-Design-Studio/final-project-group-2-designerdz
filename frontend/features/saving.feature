Feature: Saving of progress
    Scenario:  
        Given that I click on the next button
        When I am on <page>
        Then my details on <page> should be saved to the database
    
    Examples:
        | page       |
        | "signup"   |
        | "details"  |
        | "passport" |

    Scenario:  
        Given that I click on the back Button
        And I am on <page>
        When I navigate to <previous> page
        Then my previously filled details on the <previous> page should be shown
        
    Examples:
        | previous   | page      |
        | "signup"   | "details"  |
        | "details"  | "passport" |
        | "passport" | "review"   |

    Scenario:
        Given that I exit the application
        And I am on <page> 
        When I come back to the app
        Then I should be redirected back to <page>

    Examples:
        | page       |
        | "signup"   |
        | "details"  |
        | "passport" |
        | "review"   |

    Scenario:
        Given that I am on the Continue Progress page
        And I have keyed in my <number>
        Then I should be redirected back to the <page> where I left off

    Examples:
        | page       |
        | "signup"   |
        | "details"  |
        | "passport" |
        | "review"   |

