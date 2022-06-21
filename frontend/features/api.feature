Feature: Check API Response
    Scenario: Check API Response 
        Given I make a GET request to "https://dbs-service-qz6esvmepq-as.a.run.app/api/v1/users"
        When I receive a response within 0.5 seconds
        Then response should have a status 200
