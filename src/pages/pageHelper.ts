import {Browser, ElementHandle, launch, Page, Response} from 'puppeteer';

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
        args: ['--disable-notifications', '--start-maximized'],
      });
      this.page = await this.browser.newPage();
    } catch (Exception) {
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
      } catch (Exception) {
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
      } catch (Exception) {
        i++;
        if (i === this.retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }
  /**
   * @param  {any} fn
   * @returns Promise
   */
  public async evaluate(fn: any): Promise<any> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.evaluate(fn);
      } catch (Exception) {
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
  public async waitForElement(element: string): Promise<ElementHandle> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.waitForSelector(element);
      } catch (Exception) {
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
  public async $(element: string): Promise<ElementHandle> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.$(element);
      } catch (Exception) {
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
  public async $$(element: string): Promise<ElementHandle[]> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.$$(element);
      } catch (Exception) {
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
  public async focusElement(element: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        await this.page.waitForSelector(element);
        return await this.page.focus(element);
      } catch (Exception) {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) {
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
  public async clickElement(element: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        await this.page.waitForSelector(element);
        return await this.page.click(element);
      } catch (Exception) {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) {
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
  public async xpathClick(element: string): Promise<void> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        await this.page.waitForXPath(element);
        const xpathElement = await this.page.$x(element);
        return await xpathElement[0].click();
      } catch (Exception) {
        try {
          i++;
          await this.page.waitForXPath(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) {
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
        await elementHandle.click({clickCount: 3});
        return await  elementHandle.press('Backspace');
      } catch (Exception) {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) {
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
      } catch (Exception) {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) {
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
      } catch (Exception) {
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
  public async enterText(element: ElementHandle, text: string): Promise<void> {
    try {
      await element.focus();
      await element.type('');
      await element.type(text);
      await this.enterKeys('Enter');
      await this.page.waitFor(500);
    } catch (Exception) {
      throw new Error(Exception.toString());
    }
  }
  /**
   * @param  {string} element
   * @returns Promise
   */
  public async getText(element: string): Promise<string[]> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        return await this.page.evaluate((element) => {
          const els = Array.from(document.querySelectorAll(element));
          return els.map((el) => {
            return el.textContent;
          });
        }, element);
      } catch (Exception) {
        try {
          i++;
          await this.page.waitForSelector(element);
          await this.page.evaluate('arguments[0].click()', element);
          continue;
        } catch (Exception) {
          i++;
          if (i === this.retryCount) {
            throw new Error(Exception.toString());
          }
        }
      }
    }
  }
  /**
   * @param  {any} options?
   * @returns Promise
   */
  public async waitForNavigation(options?: any): Promise<Response> {
    try {
      return await this.page.waitForNavigation(options);
    } catch (Exception) {
      throw new Error(Exception.toString());
    }
  }
  /**
   * @param  {string} element
   * @returns Promise
   */
  public async isElementExists(element: string): Promise<boolean> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        await this.page.waitForSelector(element, {timeout: 1000});
        if ((await this.page.$(element)) !== null) {
          return true;
        } else {
          return false;
        }
      } catch (Exception) {
        i++;
        if (i === this.retryCount) {
          return false;
        }
      }
    }
  }
  /**
   * @param  {string} element
   * @returns Promise
   */
  public async isElementVisible(element: string): Promise<boolean> {
    let i: number = 0;
    while (i < this.retryCount) {
      try {
        const isVisible = await this.page.evaluate(() => {
          const el = document.querySelector(element);
          if (!el) {
            return false;
          }
          const style = window.getComputedStyle(el);
          return style && style.display !== 'none' && style.visibility !== 'hidden' &&
              style.opacity !== '0';
        });
        return isVisible;
      } catch (Exception) {
        i++;
        if (i === this.retryCount) {
          throw new Error(Exception.toString());
        }
      }
    }
  }

  public async screenshot(): Promise<any> {
    try {
        return await this.page.screenshot();
    } catch (Exception) {
        throw new Error(Exception.toString());
    }
  }
  public async close() {
    try {
      return await this.browser.close();
    } catch (Exception) {
      throw new Error(Exception.toString());
    }
  }
}

export {PageHelper};
