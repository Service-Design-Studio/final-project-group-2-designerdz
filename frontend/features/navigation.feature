Feature: User Navigation
  Scenario:  
    Given I am on <page>
    When I click on the next button
    Then I should move forward to the <next> page
  
  Examples:
  | page       | next       |
  | ""         | "signup"   |
  | "signup"   | "details"  |
  | "details"  | "passport" |
  | "passport" | "review"   |
  | "review"   | "success"  |

  Scenario:
    Given I am on <page>
    When I click on the back button
    Then I should go back to the <previous> page
    
  Examples:
    | previous   | page       |
    | ""         | "signup"   |
    | "signup"   | "details"  |
    | "details"  | "passport" |
    | "passport" | "review"   |

  Scenario:
    Given I am on the passport page
    And I have filled in my <full_name>
    When I click on the next button
    Then I should move forward to the review page
    And my <full_name> should be shown

  Examples:
    | full_name       |
    | "Da Yi Ma"      |
    | "Sally Abbott"  |


  # TODO: Figure out how to pass data through the app
  # Scenario:
  #   Given I have filled up the details page with my <name> and <contact>
  #   And I have filled up the passport page with my <full_name> and <passport_number>
  #   When I am on the review page
  #   Then I should be able to see my <name>, <contact>, <full_name>, and <passport_number>

  # Examples:
  #   | name       | contact     | full_name      | passport_number |
  #   | "Yi Ma"    | "96182920"  | "Da Yi Ma"     | CN3215691       |
  #   | "Sally"    | "90422312"  | "Sally Abbott" | US2105191       |
    
