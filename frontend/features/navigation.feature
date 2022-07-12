Feature: User Navigation
  Scenario:  
    Given I am on <page>
    When I click on the next button
    Then I should move forward to the <next> page

  Examples:
  | page       | next       |
  | "signup"   | "details"  |
  | passport   | "review"   |
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

    
