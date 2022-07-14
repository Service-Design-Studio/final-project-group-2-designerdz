Feature: Form Validation
As a user filling up the form
I want to know if I have filled in the form correctly
So that I my application will be processed quickly

    Scenario: Compulsory fields
        Given I am on <page> and I have not filled in any fields
        When I click on <button>
        Then I should stay on <page>
        And I should see <errors>
        Examples:
        | page       | button    | errors                         |
        | "details"  | "next"    | "Display Name,Phone Number"    |