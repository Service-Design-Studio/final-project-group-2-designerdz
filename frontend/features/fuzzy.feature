Feature: Fuzzy Testing
    Background: Signing up for single user
        Given I am signing up for myself

    Scenario: Filling in unacceptable fields
        Given I have proceeded to the <page> page
        When I have filled in the wrong field for <field>, I should see the error <error>

    Examples:
        | page | field | error |
        | details | phone_number | Please enter using numbers only |
        | passport | full_name | Invalid full name |
        | passport | passport_number | Invalid Passport Number |
        | passport | nationality | Nationality should only contain text! |

    Scenario: Filling in good fields
        Given I have proceeded to the <page> page
        When I have filled in the correct field for <field>, I should not see the error <error>

    Examples:
        | page | field | error |
        | details | phone_number | Please enter using numbers only |
        | passport | full_name | Invalid full name |
        | passport | passport_number | Invalid Passport Number |
        | passport | nationality | Nationality should only contain text! |