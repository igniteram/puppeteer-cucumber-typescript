import { page } from "../support/hooks";
const { Given } = require("cucumber");
const chai = require("chai").use(require("chai-as-promised"));
const expect = chai.expect;

Given(/^I am on "(.*?)" search page$/, async (text) => {
    if(text === 'google') {
        await expect(page.getTitle()).to.eventually.equal("Google");
    } else if(text === 'cucumber') {
        await expect(page.getTitle()).to.eventually.equal(text+" - Google Search");
    } else if(text === 'puppeteer chrome') {
        await expect(page.getTitle()).to.eventually.equal(text+" - Google Search");
    }   
});
