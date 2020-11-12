Feature: To log in to yaoe successfully

@CucumberScenario
Scenario: Login with gmail successfully
Given I am on yaoe home page
When I click on login button 
When I click on google login button
Then I should successfully login to yaoe