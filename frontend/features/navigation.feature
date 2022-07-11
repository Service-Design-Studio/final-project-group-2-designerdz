# Feature: User Navigation
#   Scenario:  
#     Given I am on <page>
#     When I click on the next button
#     Then I should move forward to the <next> page

#   Examples:
#   | page       | next       |
#   | ""         | "signup"   |
#   | "signup"   | "details"  |
#   | "details"  | "passport" |
#   | passport | "review"   |
#   | "review"   | "success"  |

#   Scenario:
#     Given I am on <page>
#     When I click on the back button
#     Then I should go back to the <previous> page
    
#   Examples:
#     | previous   | page       |
#     | ""         | "signup"   |
#     | "signup"   | "details"  |
#     | "details"  | "passport" |
#     | "passport" | "review"   |

#   Scenario:
#     Given I am on the passport page
#     And I have filled in my <full_name>
#     When I click on the next button
#     Then I should move forward to the review page
#     And my <full_name> should be shown

#   Examples:
#     | full_name       |
#     | "Da Yi Ma"      |
#     | "Sally Abbott"  |
    
