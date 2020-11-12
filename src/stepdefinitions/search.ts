import { loginPage } from '../pages/loginPage';
import { page } from '../support/hooks';

const { Given, When, Then, setDefaultTimeout } = require('cucumber');
const chai = require('chai').use(require('chai-as-promised'));
const expect = chai.expect;
setDefaultTimeout(60 * 1000);

Given('I am on yaoe home page', async () => {
    await expect(page.getTitle()).to.eventually.equal('Yaoe | Developer Workspaces in the browser');
});

When('I click on login button', async () => {
    await page.clickElement(loginPage.loginButton);
});

When('I click on google login button', async () => {
    await page.clickElement(loginPage.googleLoginButton);
});

Then('I should successfully login to yaoe', {timeout:60*1000}, async () => {
    const newPage = await page.newWindow();

    await newPage.waitForSelector(loginPage.email);
    await newPage.focus(loginPage.email);
    await newPage.type(loginPage.email, '');
    await newPage.keyboard.press('Enter');
    await newPage.waitForNavigation({ waitUntil: 'networkidle0' });
    await newPage.waitForSelector(loginPage.password);
    await newPage.focus(loginPage.password);
    await newPage.type(loginPage.password, '');
    await newPage.keyboard.press('Enter');
    await expect(page.getTitle()).to.eventually.equal('Yaoe | Dashboard');

});
