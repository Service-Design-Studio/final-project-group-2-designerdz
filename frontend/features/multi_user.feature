Feature: Multi User
    Scenario: Adding children accounts
        Given I am on family
        When I click on the add children button
        Then a child should be added

        #To Fill In
        Examples:
        | page       | next       |


    Scenario: Adding children details
        Given I am on family page and a child has been added
        When I click on the edit button
        Then I should be navigated to the details page for that child

    Scenario: Deleting children
        Given I am on family page and a child has been added
        When I click on the remove button
        Then the child should be removed

    Scenario: Autofill shared details
        Given I am on edit child details page
        When I check the autofill checkbox
        Then the details should be autofilled

    Scenario: Uncheck autofill checkbox
        Given I am on edit child details page and the auotfill checkbox is check
        When I uncheck the autofill checkbox
        Then the details should be empty

    Scenario: Carousel Navigation
        Given I am on upload passport page and I have at least one child
        When I click on another child account in the Carousel
        Then I should be navigated to the details page for that child



