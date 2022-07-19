Feature: User Navigation
    # TODO: Fix thix
    As a user filling up the form
    I want to be informed when the form has errors 
    So that I know where to make edits and be sure that I have filled up the form correctly

    Background:
        

    Scenario:  
        Given I am on <page>
        When I click on the next button
        Then I should move forward to the <next> page

    Examples:
    | page       | next       |
    | "signup"   | "details"  |
    | "passport"   | "review"   |
    | "review"   | "success"  |

    Scenario:
        Given I am on <page>
        When I click on the back button
        Then I should go back to the <previous> page
        
    Examples:
        | previous   | page       |
        | ""         | "signup"   |
        | "details"  | "passport" |
        | "passport" | "review"   |

    
