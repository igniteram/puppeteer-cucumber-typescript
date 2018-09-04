Feature: To search Puppeteer in google

@ProtractorScenario
Scenario: Puppeteer Google Search
Given I am on "cucumber" search page
When I type "puppeteer chrome"
When I click on search button
Then I clear the search text