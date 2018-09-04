import { searchPage } from "../pages/searchPage";
import { page } from "../support/hooks";
const { When, Then } = require("cucumber");

When(/^I type "(.*?)"$/, async (text) => {
    await page.sendElementText(searchPage.searchTextBox, text);
});

When(/^I click on search button$/, async () => {
    await page.enterKeys('Enter');
});

Then(/^I click on google logo$/, async () => {
    await page.clickElement(searchPage.logo);
});