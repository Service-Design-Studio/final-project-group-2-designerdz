Feature: Fuzzy Testing
    Background: Signing up for single user
        Given I am signing up for myself

    # Scenario: Filling in unacceptable fields
    #     Given I have proceeded to the <page> page
    #     When I have filled in the wrong field for <field>
    #     Then I should see <error>

    # Examples:
    #     | page | field | error |
    #     | details | number | "Please enter using numbers only" |
    #     | passport | full_name | "Invalid full name" |
    #     | passport | passport_number | "Invalid Passport Number" |
    #     | passport | nationality | "Nationality should only contain text!" |

    Scenario: Filling in good fields
        Given I have proceeded to the <page> page
        When I have filled in the correct field for <field>
        Then I should not see <error>

    Examples:
        | page | field | error |
        | details | number | "Please enter using numbers only" |
        | passport | full_name | "Invalid full name" |
        | passport | passport_number | "Invalid Passport Number" |
        | passport | nationality | "Nationality should only contain text!" |
