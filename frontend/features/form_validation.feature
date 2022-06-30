Feature: Form Validation
    Scenario: Incomplete Icon in Carousel
        Given I am on upload passport page and I have at least one child
        When I select a different account in the Carousel
        Then I should see a bubble indicating that details for that family member is not complete

    Scenario: Prevent navigation for incomplete form step
        Given I am on upload passport and have not completed the form
        When I attempt to navigate to the next page
        Then I should not be able to navigate to the next page
        And I should see a pop-up indicating which form fields are incopmplete

    Scenario: Type Enforcement
        Given I am on upload passport page
        When I attempt to key in <mock_type> inside the <form_type> 
        And <mock_type> differs from <field_type>
        Then I should see a pop-up indicating that the value is not of <field_type>
    
    # TODO: Fill in field_type with the class names of the fields in the upload passport page.
    Examples:
    | mock_type     | field_type            |
    | "abc"         | "passport_number"     |

    
