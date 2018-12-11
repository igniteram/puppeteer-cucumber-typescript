import { searchPage } from '../pages/searchPage';
import { page } from '../support/hooks';
const { Then } = require('cucumber');

Then(/^I clear the search text$/, async () => {
     await page.clearElement(searchPage.searchTextBox);
});
