Feature: Form Validation
As a user filling up the form
I want to be informed when the form has errors 
So that I know where to make edits and be sure that I have filled up the form correctly

    Scenario: Prevent moving to next page if compulsory fields are not filled
        Given I am on <page> and I have not filled in any fields
        
        When I click on <button>
        Then I should be on <page>
        And I should see <errors>

        When I fill up <form_fields>
        And I click on <button>
        Then I should be on <next_page>

        Examples:
        | page       | button | errors                                  | form_fields                             | next_page  |
        # | "details"  | "next" | "Display Name,Phone Number"             | "display_name,phone_number"             | "family"   |
        # | "child"    | "next" | "Display Name,Phone Number"             | "display_name,phone_number"             | "family"   |
        | "passport" | "next" | "Full Name,Passport Number,Passport Expiry,Nationality,Gender,Date of Birth" | "full_name,passport_number,passport_expiry,nationality,gender,dob" | "review"   |

    # Scenario: Carousel Pop-up For Incomplete Family Member Details
    #     Given I am on passport page, have at least one child and have not completed the fields on the current page
    #     When I click on another family member
    #     Then I should see an icon on the carousel of the family member I just navigated away from  