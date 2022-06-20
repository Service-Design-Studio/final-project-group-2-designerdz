Feature: User Navigation
    Scenario:  
        Given I am on the <current> page
        When I click on the next button
        Then I should navigate to the <next> page
    
  Examples:
    | current    | next       |
    | ""         | "signup"   |
    | "signup"   | "details"  |
    | "details"  | "passport" |
    | "passport" | "review"   |