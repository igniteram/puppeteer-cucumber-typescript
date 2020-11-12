const { BeforeAll, After, AfterAll, Status } = require('cucumber');
import {loginPage} from '../pages/loginPage';
import {PageHelper} from '../pages/pageHelper';
const page: PageHelper = new PageHelper();

BeforeAll({timeout: 100 * 1000}, async () => {
    await page.init();
    await page.open(loginPage.url);
});

/* istanbul ignore next */
After(async function(scenario) {
    if (scenario.result.status === Status.FAILED) {
        // screenShot is a base-64 encoded PNG
         const screenShot = await page.screenshot();
         this.attach(screenShot, 'image/png');
    }
});

AfterAll({timeout: 100 * 1000}, async () => {
    await page.close();
});

/**
 * export the instance of the page
 */
export {page};
