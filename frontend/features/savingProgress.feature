Feature: Saving of progress
    As a foreigner in the midst of registration
    I want to have my progress saved
    So that I can leave and come back to the form again without having to start over

    Scenario:  
        Given I have registered till I am on the Family page
        When I close my browser and then reopen it to Family page
        Then I will find myself on Landing page

    
    # Examples:
    #     | page       |              landing                       |
    #     | "family"  |       "http://localhost:3000/landing"      |

    
