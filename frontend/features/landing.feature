Feature: User Navigation
  Scenario:  
      Given I am on the <previous> page
      When I click on the next button
      Then I should move forward to the <next> page
  
  Examples:
  | previous    | next       |
  | ""         | "signup"   |
  | "signup"   | "details"  |
  | "details"  | "passport" |
  | "passport" | "review"   |

  Scenario:  
    Given I am now on the <next> page
    When I click on the back button
    Then I should go back to the <previous> page
    
  Examples:
    | previous    | next       |
    | ""         | "signup"   |
    | "signup"   | "details"  |
    | "details"  | "passport" |
    | "passport" | "review"   |