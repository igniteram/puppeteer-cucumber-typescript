import { Browser, ElementHandle, launch, Page, Response } from 'puppeteer';

class PageHelper {
  private browser: Browser;
  private page: Page;
  private readonly retryCount: number = 3;

  constructor() {
    this.browser = null;
    this.page = null;
  }

  public async init() {
    try {
      this.browser = await launch({
        headless: true,
        args: ['–no-sandbox', '–disable-setuid-sandbox', '--disable-notifications', '--start-maximized'],
        ignoreHTTPSErrors: true,
        dumpio: false,
      });
      this.page = await this.browser.newPage();
      await Promise.all([
        this.page.coverage.startJSCoverage(),
        this.page.coverage.startCSSCoverage(),
      ]);
    } catch (Exception) /* istanbul ignore next */ {
      throw new Error(Exception.toString());
    }
  }
  /**
   * @param  {string} url
   * @returns Promise
   */
  public async open(url: string): Promise<Response> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.goto(url);
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === this.retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }
  /**
   * @returns Promise
   */
  public async getTitle(): Promise<string> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.title();
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === this.retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }

  /**
   * @param  {string} element
   * @returns Promise
   */
  public async clickElement(element: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        await this.page.waitForSelector(element);
        return await this.page.click(element);
      } catch (Exception) /* istanbul ignore next */ {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) /* istanbul ignore next */ {
          i++;
          if (i === this.retryCount) {
            throw new Error(Exception.toString());
          }
        }
      }
    }
  }
  /**
   * @param  {string} element
   * @param  {string} text
   * @returns Promise
   */
  public async sendElementText(element: string, text: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.type(element, text);
      } catch (Exception) /* istanbul ignore next */ {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) /* istanbul ignore next */ {
          i++;
          if (i === this.retryCount) {
            throw new Error(Exception.toString());
          }
        }
      }
    }
  }
  /**
   * @param  {string} element
   * @returns Promise
   */
  public async clearElement(element: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        const elementHandle = await this.page.$(element);
        await elementHandle.click({ clickCount: 3 });
        return await elementHandle.press('Backspace');
      } catch (Exception) /* istanbul ignore next */ {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) /* istanbul ignore next */ {
          i++;
          if (i === this.retryCount) {
            throw new Error(Exception.toString());
          }
        }
      }
    }
  }
  /**
   * @param  {string} keys
   * @returns Promise
   */
  public async enterKeys(keys: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.keyboard.press(keys);
      } catch (Exception) /* istanbul ignore next */ {
        i++;
        if (i === this.retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }
  /**
   * @param  {ElementHandle} element
   * @param  {any} answers
   * @returns Promise
   */

  public async screenshot(): Promise<any> {
    try {
      return await this.page.screenshot();
    } catch (Exception) /* istanbul ignore next */ {
      throw new Error(Exception.toString());
    }
  }
  public async close() {
    try {
      const pti = require('puppeteer-to-istanbul');
      const [jsCoverage, cssCoverage] = await Promise.all([
        this.page.coverage.stopJSCoverage(),
        this.page.coverage.stopCSSCoverage(),
      ]);
      pti.write(jsCoverage);
      pti.write(cssCoverage);
      return await this.browser.close();
    } catch (Exception) /* istanbul ignore next */ {
      throw new Error(Exception.toString());
    }
  }
}

export { PageHelper };
