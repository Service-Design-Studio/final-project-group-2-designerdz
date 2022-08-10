Feature: Form Validation
    As a user filling up the form
    I want to be informed when the form has errors 
    So that I know where to make edits and be sure that I have filled up the form correctly

    Background: Signing up for family
        Given I am signing up for my family

    Scenario: Prevent moving to next page if compulsory fields are not filled
        Given I have proceeded to the <page> page
        And I have not filled in any fields
        When I click on the next button
        Then I should be on the <page> page
        And I should see <errors>

        Examples:
        | page     | errors                                  |
        | details  | "Display Name,Phone Number"             |
        | child    | "Display Name"             |
        | passport | "Full Name,Passport Number,Passport Expiry,Nationality,Gender,Birth Date" | 

    Scenario: Carousel Pop-up For Incomplete Family Member Details
        Given I have proceeded to the passport page
        And I have not filled in any fields
        When I click on my child icon
        Then I should see an icon on the carousel of the family member I just navigated away from
